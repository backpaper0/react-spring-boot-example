import React, { useState } from 'react';

function App() {
  const [first, setFirst] = useState(true);
  const [userinfo, setUserinfo] = useState({ name: "" });
  if (first) {
    setFirst(false);
    fetch("/api/userinfo").then(a => a.json()).then(setUserinfo);
  }
  if (userinfo.name === "") {
    return (<div>Loading...</div>);
  }
  return (
    <div className="App">
      <h1>hello, {userinfo.name}</h1>
    </div>
  );
}

export default App;
