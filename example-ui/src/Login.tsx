import React, { useState, useContext } from 'react';

import { CsrfTokenContext } from "./WithCsrfToken";
import { useUserinfo } from "./WithUserinfo";
import { useHttp } from "./http";

function Login() {

  const [, refreshUserinfo] = useUserinfo();
  const [, refreshCsrfToken] = useContext(CsrfTokenContext);

  const [error, setError] = useState("");
  const [form, setForm] = useState({ username: "", password: "" });

  const http = useHttp();

  const updateForm: React.ChangeEventHandler<HTMLInputElement> = event => {
    const { name, value } = event.target;
    setError("");
    setForm(form => ({ ...form, [name]: value }));
  };

  const submit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    setError("");
    http.postForm("/api/login", form).then(resp => {
      return Promise.all([
        refreshUserinfo(),
        refreshCsrfToken()
      ]);
    }).catch(e => {
      setError(e.statusText);
    });
  };
  return (
    <form onSubmit={submit}>
      <p>{error}</p>
      <p><input type="text" name="username" onChange={updateForm} autoFocus={true}/></p>
      <p><input type="password" name="password" onChange={updateForm}/></p>
      <p><button type="submit">Login</button></p>
    </form>
  );
}

export default Login;
