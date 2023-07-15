import { useCallback, useState } from 'react';

import Authentication from "./Authentication";
import Home from "./Home";
import Loading from "./Loading";
import WithCsrfToken from "./WithCsrfToken";
import WithUserinfo from "./WithUserinfo";

function App() {

  const [count, setCount] = useState(2);
  const initialized = useCallback(() => setCount(count => count - 1), []);
  const loaded = count < 1;

  return (
    <WithCsrfToken initialized={initialized}>
      <WithUserinfo initialized={initialized}>
        <Loading loaded={loaded}>
          <Authentication>
            <Home />
          </Authentication>
        </Loading>
      </WithUserinfo>
    </WithCsrfToken>
  );
}

export default App;

