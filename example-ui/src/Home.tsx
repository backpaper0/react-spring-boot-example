import React from 'react';

import { useCsrfToken } from "./WithCsrfToken";
import { useUserinfo } from "./WithUserinfo";
import { useHttp } from "./http";

function Home() {
  const [userinfo, refreshUserinfo] = useUserinfo();
  const [, refreshCsrfToken] = useCsrfToken();
  const http = useHttp();
  const logout: React.MouseEventHandler<HTMLButtonElement> = async event => {
    await http.postForm("/api/logout", {});
    refreshUserinfo();
    refreshCsrfToken();
  };
  return (
    <div className="App">
      <h1>Hello, {userinfo.name}!</h1>
      <p><button onClick={logout}>Logout</button></p>
    </div>
  );
}

export default Home;
