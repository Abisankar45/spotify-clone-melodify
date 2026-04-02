import React, { useEffect, useState } from 'react'
import Home from './Components/Home'
import Opening from './Components/Opening'

function App() {

  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  return isSplashVisible ? <Opening /> : <Home />;
}

export default App