import React, { useState, useContext, useCallback } from 'react';

import { CsrfTokenContext } from "./WithCsrfToken";
import { UserinfoContext } from "./WithUserinfo";

function Login() {

  const [userinfo, refreshUserinfo] = useContext(UserinfoContext);
  const [csrfToken, refreshCsrfToken] = useContext(CsrfTokenContext);

  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const updateUsername = useCallback(event => {
    setError("");
    setUsername(event.target.value);
  }, []);
  const updatePassword = useCallback(event => {
    setError("");
    setPassword(event.target.value);
  }, []);
  const submit = useCallback(event => {
    event.preventDefault();
    setError("");
    fetch("/api/login", {
      method: "POST",
      headers: {
        [csrfToken.headerName]: csrfToken.token,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        username,
        password
      })
    }).then(resp => {
      if (resp.ok) {
        return Promise.all([
          refreshUserinfo(),
          refreshCsrfToken()
        ]);
      }
      throw resp.statusText;
    }).catch(e => {
      setError(e);
    });
  }, [error, username, password, csrfToken]);
  return (
    <form onSubmit={submit}>
      <p>{error}</p>
      <p><input type="text" name="username" onChange={updateUsername} autoFocus={true}/></p>
      <p><input type="password" name="password" onChange={updatePassword}/></p>
      <p><button type="submit">Login</button></p>
    </form>
  );
}

export default Login;
