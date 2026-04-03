import React, { useEffect, useState } from 'react'
import Home from './Components/Home'
import Opening from './Components/Opening'
function App() {
  const [isSpalshVisible,setSplashVisible] = useState(true);

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setSplashVisible(false)
    },8000)
    return()=> clearTimeout(timer);
  },[])
  return (
    <>
    {isSpalshVisible && <Opening />}
    <Home />
    </>
  )
}

export default App