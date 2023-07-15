import React, { useCallback, useContext, useState } from 'react';

import { useInit } from "./hooks";
import { useHttp } from "./http";

export interface CsrfToken {
  headerName: string;
  parameterName: string;
  token: string;
}

const defaultCsrfToken = () => ({ headerName: "", parameterName: "", token: "" });

const CsrfTokenContext = React.createContext<[CsrfToken, () => void]>([defaultCsrfToken(), () => Promise.resolve()]);

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

export function useCsrfToken() {
  return useContext(CsrfTokenContext);
}

