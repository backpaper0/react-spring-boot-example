import React, { useState, useCallback } from 'react';

import { useHttp } from "./http";
import { useInit } from "./hooks";

export interface Userinfo {
  name: string;
  authorities: string[];
}

const defaultUserinfo = () => ({ name: "", authorities: [] });

export const UserinfoContext = React.createContext<[Userinfo, () => void]>([defaultUserinfo(), () => Promise.resolve()]);

interface WithUserinfoProps {
  children: React.ReactNode;
  initialized: () => void;
}

function WithUserinfo({ children, initialized }: WithUserinfoProps) {

  const [userinfo, setUserinfo] = useState(defaultUserinfo);

  const http = useHttp();

  const refreshUserinfo = useCallback(() => {
    return http.get("/api/userinfo").catch(e => defaultUserinfo()).then(setUserinfo);
  }, [http]);

  useInit(() => {
    refreshUserinfo().then(initialized);
  });

  return (
    <UserinfoContext.Provider value={[userinfo, refreshUserinfo]}>
      {React.Children.only(children)}
    </UserinfoContext.Provider>
  );
}

export default WithUserinfo;

