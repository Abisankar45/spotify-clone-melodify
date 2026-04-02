import React, { useState } from 'react'
import Home from './Components/Home';
import Opening from './Components/Opening';

function App() {
  const [isSplashVisible, setSplashVisible] = useState(true);

  const handleIntroEnd = () => {
    setSplashVisible(false);
  };

  return (
    <>
      {isSplashVisible ? (
        <Opening onEnd={handleIntroEnd} />
      ) : (
        <Home />
      )}
    </>
  )
}

export default App;