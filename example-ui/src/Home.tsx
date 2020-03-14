import React, { useState, useContext, useCallback } from 'react';

import { CsrfTokenContext } from "./WithCsrfToken";
import { UserinfoContext } from "./WithUserinfo";

function Home() {
  const [userinfo, refreshUserinfo] = useContext(UserinfoContext);
  const [csrfToken, refreshCsrfToken] = useContext(CsrfTokenContext);
  const logout = useCallback(() => {
    fetch("/api/logout", {
      method: "POST",
      headers: {
        [csrfToken.headerName]: csrfToken.token,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(() => {
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
