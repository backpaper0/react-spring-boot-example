import React, { useCallback, useContext, useState } from 'react';

import { useInit } from "./hooks";
import { useHttp } from "./http";

export interface Userinfo {
  name: string;
  authorities: string[];
}

const defaultUserinfo = () => ({ name: "", authorities: [] });

const UserinfoContext = React.createContext<[Userinfo, () => void]>([defaultUserinfo(), () => Promise.resolve()]);

interface WithUserinfoProps {
  children: React.ReactNode;
  initialized: () => void;
}

function WithUserinfo({ children, initialized }: WithUserinfoProps) {

  const [userinfo, setUserinfo] = useState(defaultUserinfo);

  const http = useHttp();

  const refreshUserinfo = useCallback(() => {
    return http.get("/api/userinfo").catch(() => defaultUserinfo()).then(setUserinfo);
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

export function useUserinfo() {
  return useContext(UserinfoContext);
}
