import React, { useState, useCallback } from 'react';

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

  const refreshCsrfToken = useCallback(() => {
    return fetch("/api/csrf_token").then(a => a.json()).then(setCsrfToken);
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

