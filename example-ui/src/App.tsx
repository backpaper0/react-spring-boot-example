import React, { useState, useContext, useCallback } from 'react';

import WithCsrfToken, { CsrfTokenContext } from "./WithCsrfToken";
import WithUserinfo, { UserinfoContext } from "./WithUserinfo";
import Loading from "./Loading";
import Authentication from "./Authentication";
import Home from "./Home";

function App() {

  const [initCsrfToken, setInitCsrfToken] = useState(false);
  const [initUserinfo, setInitUserinfo] = useState(false);
  const initializedCsrfToken = useCallback(() => setInitCsrfToken(true), []);
  const initializedUserinfo = useCallback(() => setInitUserinfo(true), []);
  const loaded = initCsrfToken && initUserinfo;

  return (
    <WithCsrfToken initialized={initializedCsrfToken}>
    <WithUserinfo initialized={initializedUserinfo}>
      <Loading loaded={loaded}>
        <Authentication>
          <Home/>
        </Authentication>
      </Loading>
    </WithUserinfo>
    </WithCsrfToken>
  );
}

export default App;

