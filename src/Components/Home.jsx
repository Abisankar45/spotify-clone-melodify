import React from 'react'
import Sidebar from './Sidebar'
import Player from './Player'
import Display from './Display'

function Home() {
  return (
    <div className='h-screen bg-black text-white'>
        <div className='h-[90%] flex'>
            <Sidebar /> <Display />
        </div>
        <Player />
    </div>
  )
}

export default Home