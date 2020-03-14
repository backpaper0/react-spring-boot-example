import React, { useState, useCallback } from 'react';

import { useHttp } from "./http";
import { useInit } from "./hooks";

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

  const [csrfToken, setCsrfToken] = useState(defaultCsrfToken);

  const http = useHttp();

  const refreshCsrfToken = useCallback(() => {
    return http.get("/api/csrf_token").then(setCsrfToken);
  }, [http]);

  useInit(() => {
    refreshCsrfToken().then(initialized);
  });

  return (
    <CsrfTokenContext.Provider value={[csrfToken, refreshCsrfToken]}>
      {React.Children.only(children)}
    </CsrfTokenContext.Provider>
  );
}

export default WithCsrfToken;

