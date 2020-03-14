import React, { useState, useCallback } from 'react';

import { useHttp } from "./http";

export interface CsrfToken {
  headerName: string;
  parameterName: string;
  token: string;
}

const defaultCsrfToken = () => ({ headerName: "", parameterName: "", token: "" });

export const CsrfTokenContext = React.createContext<[CsrfToken, () => void]>([defaultCsrfToken(), () => Promise.resolve()]);

interface WithCsrfTokenProps {
  children: React.ReactNode;
  initialized: () => void;
}

function WithCsrfToken({ children, initialized }: WithCsrfTokenProps) {

  const [first, setFirst] = useState(true);
  const [csrfToken, setCsrfToken] = useState(defaultCsrfToken);

  const http = useHttp();

  const refreshCsrfToken = useCallback(() => {
    return http.get("/api/csrf_token").then(setCsrfToken);
  }, []);

  if (first) {
    setFirst(false);
    refreshCsrfToken().then(initialized);
  }

  return (
    <CsrfTokenContext.Provider value={[csrfToken, refreshCsrfToken]}>
      {React.Children.only(children)}
    </CsrfTokenContext.Provider>
  );
}

export default WithCsrfToken;

