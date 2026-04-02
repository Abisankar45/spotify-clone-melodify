import React, { useEffect, useState } from 'react'
import Home from './Components/Home'
import Opening from './Components/Opening'
function App() {
  const [isSplahVisible,setSplashVisible] = useState(true);
  useEffect(()=>{
    const timer = setTimeout(()=>{
      setSplashVisible(false);
    },7000)
    return()=> clearTimeout(timer);
  },[]);
  return (
    <>
    {isSplahVisible && <Opening />}
    <Home />
    </>
  )
}

export default App