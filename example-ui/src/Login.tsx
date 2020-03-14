import React, { useState, useContext, useCallback } from 'react';

import { CsrfTokenContext } from "./WithCsrfToken";
import { UserinfoContext } from "./WithUserinfo";
import { useHttp } from "./http";

function Login() {

  const [userinfo, refreshUserinfo] = useContext(UserinfoContext);
  const [csrfToken, refreshCsrfToken] = useContext(CsrfTokenContext);

  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const http = useHttp();

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
    http.postForm("/api/login", {
      username,
      password
    }).then(resp => {
      return Promise.all([
        refreshUserinfo(),
        refreshCsrfToken()
      ]);
    }).catch(e => {
      setError(e.statusText);
    });
  }, [error, username, password, http]);
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
