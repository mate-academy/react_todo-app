import React, { useEffect, useState } from 'react';
import LayoutAll from './LayoutAll';

function App() {
  const [serverData, setServerData] = useState('');

  useEffect(() => {
    fetch('http://localhost:300/api')
      .then(result => result.json())
      .then((result) => {
        setServerData(result);
      });
  }, []);

  return (
    <>
      <h1>
data from server:
        {' '}
        {JSON.stringify(serverData)}
      </h1>
      <LayoutAll />
    </>
  );
}

export default App;
