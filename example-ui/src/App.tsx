import React, { useState, useContext, useCallback } from 'react';

function App() {

  const [first, setFirst] = useState(true);
  const [init, setInit] = useState(false);

  const [csrfToken, setCsrfToken] = useState(defaultCsrfToken);

  const refreshCsrfToken = useCallback(() => {
    return fetch("/api/csrf_token").then(a => a.json()).then(setCsrfToken);
  }, []);



  const [userinfo, setUserinfo] = useState(defaultUserinfo);

  const refreshUserinfo = useCallback(() => {
    return fetch("/api/userinfo").then(a => a.json()).catch(e => defaultUserinfo()).then(setUserinfo);
  }, []);



  if (first) {
    setFirst(false);
    Promise.all([
      refreshCsrfToken(),
      refreshUserinfo()
    ]).then(() => setInit(true));
  }

  if (init === false) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <CsrfTokenContext.Provider value={[csrfToken, refreshCsrfToken]}>
    <UserinfoContext.Provider value={[userinfo, refreshUserinfo]}>
      <App2/>
    </UserinfoContext.Provider>
    </CsrfTokenContext.Provider>
  );
}

export default App;


interface CsrfToken {
  headerName: string;
  parameterName: string;
  token: string;
}

const defaultCsrfToken = () => ({ headerName: "", parameterName: "", token: "" });

const CsrfTokenContext = React.createContext<[CsrfToken, () => void]>([defaultCsrfToken(), () => Promise.resolve()]);



interface Userinfo {
  name: string;
  authorities: string[];
}

const defaultUserinfo = () => ({ name: "", authorities: [] });

const UserinfoContext = React.createContext<[Userinfo, () => void]>([defaultUserinfo(), () => Promise.resolve()]);



function App2() {

  const [userinfo, refreshUserinfo] = useContext(UserinfoContext);

  if (userinfo.name === "") {
    return (
      <Login/>
    );
  }

  return (
    <App3/>
  );
}




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



function App3() {
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
      <h1>hello, {userinfo.name}</h1>
      <p><button onClick={logout}>Logout</button></p>
    </div>
  );
}
