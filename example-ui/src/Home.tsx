import React, { useState, useContext, useCallback } from 'react';

import { CsrfTokenContext } from "./WithCsrfToken";
import { UserinfoContext } from "./WithUserinfo";
import { useHttp } from "./http";

function Home() {
  const [userinfo, refreshUserinfo] = useContext(UserinfoContext);
  const [csrfToken, refreshCsrfToken] = useContext(CsrfTokenContext);
  const http = useHttp();
  const logout = useCallback(() => {
    http.postForm("/api/logout", {}).then(() => {
      refreshUserinfo();
      refreshCsrfToken();
    });
  }, [csrfToken]);
  return (
    <div className="App">
      <h1>Hello, {userinfo.name}!</h1>
      <p><button onClick={logout}>Logout</button></p>
    </div>
  );
}

export default Home;
