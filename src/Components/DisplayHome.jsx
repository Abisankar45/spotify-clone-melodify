import React from 'react'
import Navbar from './Navbar'
import { albumsData } from '../assets/assets'
import AlbumItems from './AlbumItems'

function DisplayHome() {
  return (
    <>
        <Navbar />
        <div className='mb-4'>
          <h1 className='my-5 font-bold text-2xl'>Your top Playlist</h1>
          <div className='flex overflow-auto'>
            {/* {"index for remove duplication"} */}
            {albumsData.map((item,index)=>
              (<AlbumItems  
              key={index} 
              name={item.name} 
              desc={item.desc} 
              id={item.id} 
              image={item.image}/>
              ))} 
          </div>  
        </div>
        <div className='mb-4'>
          <h1 className='my-5 font-bold text-2xl'>Your top Playlist</h1>
          <div className='flex overflow-auto'>
            {/* {"index for remove duplication"} */}

          </div>  
        </div>
    </>
  )
}

export default DisplayHome