import React, { useState } from 'react';

import { useCsrfToken } from "./WithCsrfToken";
import { useUserinfo } from "./WithUserinfo";
import { useHttp } from "./http";

function Login() {

  const [, refreshUserinfo] = useUserinfo();
  const [, refreshCsrfToken] = useCsrfToken();

  const [error, setError] = useState("");
  const [form, setForm] = useState({ username: "", password: "" });

  const http = useHttp();

  const updateForm: React.ChangeEventHandler<HTMLInputElement> = event => {
    const { name, value } = event.target;
    setError("");
    setForm(form => ({ ...form, [name]: value }));
  };

  const submit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    setError("");
    try {
      await http.postForm("/api/login", form);
      refreshUserinfo();
      refreshCsrfToken();
    } catch (e: any) {
      setError(e.statusText);
    }
  };
  return (
    <div className='container py-3'>
      <div className='row'>
        <div className='col-4 offset-md-4'>
          <form onSubmit={submit}>
            <p>{error}</p>
            <p><input className='form-control' type="text" name="username" onChange={updateForm} autoFocus={true} /></p>
            <p><input className='form-control' type="password" name="password" onChange={updateForm} /></p>
            <p><button className='btn btn-primary' type="submit">Login</button></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
