import React, { useContext } from 'react';

import { CsrfTokenContext } from "./WithCsrfToken";
import { useUserinfo } from "./WithUserinfo";
import { useHttp } from "./http";

function Home() {
  const [userinfo, refreshUserinfo] = useUserinfo();
  const [, refreshCsrfToken] = useContext(CsrfTokenContext);
  const http = useHttp();
  const logout: React.MouseEventHandler<HTMLButtonElement> = event => {
    http.postForm("/api/logout", {}).then(() => {
      refreshUserinfo();
      refreshCsrfToken();
    });
  };
  return (
    <div className="App">
      <h1>Hello, {userinfo.name}!</h1>
      <p><button onClick={logout}>Logout</button></p>
    </div>
  );
}

export default Home;
