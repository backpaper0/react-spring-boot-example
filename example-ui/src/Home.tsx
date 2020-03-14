import React, { useContext } from 'react';

import { CsrfTokenContext } from "./WithCsrfToken";
import { UserinfoContext } from "./WithUserinfo";
import { useHttp } from "./http";

function Home() {
  const [userinfo, refreshUserinfo] = useContext(UserinfoContext);
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
