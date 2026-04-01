import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import DisplayAlbum from './DisplayAlbum'

function Display() {
  return (
    <div className='w-full m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
        <Routes>
            <Route path='/' element={<DisplayHome />}></Route>
            <Route path='/album/:id' element={<DisplayAlbum />} />
        </Routes>
    </div>
  )
}

export default Display