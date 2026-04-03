import React, { useContext } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { albumsData, assets, songsData } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const DisplayAlbum = () => {
  const { id } = useParams();
  const albumDataLocal = albumsData[id];
  const { playWithId } = useContext(PlayerContext);

  return (
    <>
      <Navbar />
      
      {/* --- Header Section --- */}
      <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end p-4 md:p-0'>
        {/* Album Image - Centered on mobile, left-aligned on desktop */}
        <img className='w-48 rounded shadow-lg mx-auto md:mx-0' src={albumDataLocal.image} alt="" />
        
        <div className='flex flex-col'>
          <p className='text-sm font-semibold uppercase tracking-wider text-gray-400'>Playlist</p>
          <h1 className='text-4xl font-bold mb-4 md:text-7xl text-white'>{albumDataLocal.name}</h1>
          <h4 className='text-gray-300 text-sm md:text-base mb-2'>{albumDataLocal.desc}</h4>
          
          {/* Metadata: Logo, Likes, and Duration */}
          <div className='flex items-center flex-wrap gap-1.5 text-[13px] md:text-base'>
            <div className='flex items-center gap-1'>
              <img className='w-5' src={assets.spotify_logo} alt="logo" />
              <b className='text-white hover:underline cursor-pointer'>Melodify</b>
            </div>
            <div className='text-gray-300 flex items-center gap-1 flex-wrap'>
              <span className='hidden xs:inline'>•</span> 
              <span>4,545,264 likes</span> 
              <span>•</span> 
              <b className='text-white'>50 songs,</b> 
              <span className='text-gray-400'>about 2 hr 35 min</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Table Header --- */}
      <div className='grid grid-cols-2 sm:grid-cols-4 mt-10 mb-4 pl-2 py-2 border-b border-[#ffffff1a] text-[#a7a7a7] font-medium'>
        <p><b className='mr-4'>#</b>Title</p>
        <p className='hidden sm:block'>Album</p>
        <p className='hidden lg:block'>Date Added</p>
        <p className='text-right pr-4 sm:text-left sm:pr-0'>
          <img className='w-4 inline mr-2 mb-0.5' src={assets.clock_icon} alt="" />
          Duration
        </p>
      </div>

      {/* --- Song List --- */}
      <div className='flex flex-col mb-20'>
        {
          songsData.map((item, index) => (
            <div 
              onClick={() => playWithId(item.id)} 
              key={index} 
              className='grid grid-cols-2 sm:grid-cols-4 gap-4 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff0d] cursor-pointer group transition-all rounded-md'
            >
              {/* Title & Image */}
              <div className='flex items-center text-white truncate'>
                <b className='mr-4 text-[#a7a7a7] w-4 text-center'>{index + 1}</b>
                <img className='inline w-10 h-10 mr-3 rounded' src={item.image} alt="" />
                <div className='flex flex-col truncate'>
                  <span className='font-medium truncate'>{item.name}</span>
                  <span className='text-xs text-gray-400 sm:hidden'>Artist Name</span>
                </div>
              </div>

              {/* Album (Hidden on mobile) */}
              <p className='text-[15px] hidden sm:block truncate'>{albumDataLocal.name}</p>

              {/* Date Added (Hidden on small screens) */}
              <p className='text-[15px] hidden lg:block'>3 days ago</p>

              {/* Duration (Right-aligned on mobile) */}
              <p className='text-[15px] text-right pr-4 sm:text-left sm:pr-0'>
                {item.duration}
              </p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default DisplayAlbum;