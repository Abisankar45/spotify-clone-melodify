import React from 'react'
import { assets, songsData } from '../assets/assets'

function Player() {
  return (
    <div className='fixed bottom-0 left-0 right-0 h-22.5 bg-black flex justify-between items-center text-white px-4'>

      {/* LEFT */}
      <div className='flex items-center gap-4 w-1/4 min-w-45'>
        <img className='w-12' src={songsData[0].image} alt="song0" />
        <div>
          <p>{songsData[0].name}</p>
          <p className='text-xs text-gray-400'>
            {songsData[0].desc.slice(0,10)}...
          </p>
        </div>
      </div>

      {/* CENTER */}
      <div className='flex flex-col items-center gap-2 w-2/4 max-w-lg'>

        <div className='flex items-center gap-5'>
          <img className='w-4 cursor-pointer' src={assets.shuffle_icon} />
          <img className='w-4 cursor-pointer' src={assets.prev_icon} />
          <img className='w-6 cursor-pointer' src={assets.play_icon} />
          <img className='w-4 cursor-pointer' src={assets.next_icon} />
          <img className='w-4 cursor-pointer' src={assets.loop_icon} />
        </div>

        <div className='flex items-center gap-3 w-full'>
          <p className='text-xs'>0:00</p>
          <div className='flex-1 h-1 bg-gray-300 rounded-full cursor-pointer'>
            <div className='h-1 w-0 bg-green-500 rounded-full'></div>
          </div>
          <p className='text-xs'>4:20</p>
        </div>

      </div>

      {/* RIGHT */}
      <div className='hidden lg:flex items-center gap-2 opacity-75 mt-5'>
      <img className='w-4' src={assets.play_icon} alt="play" />
      <img className='w-4' src={assets.mic_icon} alt="mic" />
      <img className='w-4' src={assets.queue_icon} alt="queue" />
      <img className='w-4' src={assets.speaker_icon} alt="speaker" />
      <img className='w-4' src={assets.volume_icon} alt="volume" />
      <div className='w-20 bg-slate-50 h-1 rounded'></div>
      <img className='w-4' src={assets.mini_player_icon} alt="miniplayer" />
      <img className='w-4' src={assets.zoom_icon} alt="zoom" />
      </div>

      

    </div>
  )
}

export default Player