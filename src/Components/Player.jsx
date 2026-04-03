import React, { useContext, useRef } from 'react'
import { assets} from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'

function Player() {
  const {seekBg, seekBar, play, pause, playStatus, track, time, before, after, seekBgClick} = useContext(PlayerContext);
  return (
    <div className='h-[10%] bg-black flex justify-between items-center text-white px-4 pb-7 pt-5'>

      {/* LEFT */}
      <div className='hidden lg:flex items-center gap-4'>
      {/* Track Changes */}
        <img className='w-12' src={track.image} alt="song0" />  
        <div>
          <p>{track.name}</p>
          <p className='text-xs text-gray-400'>
            {track.desc.slice(0,10)}...
          </p>
        </div>
      </div>

{/* CENTER SECTION */}
<div className='flex flex-col items-center gap-2 w-full max-w-[500px] mx-auto'>
  
  {/* Playback Controls */}
  <div className='flex items-center gap-6'>
    <img className='w-4 cursor-pointer opacity-70 hover:opacity-100' src={assets.shuffle_icon} alt="shuffle" />
    <img onClick={before} className='w-4 cursor-pointer opacity-70 hover:opacity-100' src={assets.prev_icon} alt="prev" />
    
    {playStatus ? (
      <img onClick={pause} className='w-8 cursor-pointer' src={assets.pause_icon} alt="pause" />
    ) : (
      <img onClick={play} className='w-8 cursor-pointer' src={assets.play_icon} alt="play" />
    )}
    
    <img onClick={after} className='w-4 cursor-pointer opacity-70 hover:opacity-100' src={assets.next_icon} alt="next" />
    <img className='w-4 cursor-pointer opacity-70 hover:opacity-100' src={assets.loop_icon} alt="loop" />
  </div>

  {/* Progress Bar & Time */}
  <div className='flex items-center gap-3 w-full px-2'>
    <p className='text-xs w-10 text-right'>
      {time.currentTime.minute}:{time.currentTime.second < 10 ? `0${time.currentTime.second}` : time.currentTime.second}
    </p>
    
    <div 
      ref={seekBg} 
      onClick={seekBgClick} 
      className='flex-1 h-1 bg-[#ffffff33] rounded-full cursor-pointer relative group'
    >
      <div 
        ref={seekBar} 
        className='h-1 w-0 bg-green-500 rounded-full transition-all'
      ></div>
    </div>

    <p className='text-xs w-10'>
      {time.totalTime.minute}:{time.totalTime.second < 10 ? `0${time.totalTime.second}` : time.totalTime.second}
    </p>
  </div>
</div>

      {/* RIGHT */}
      <div className='hidden lg:flex items-center gap-2 opacity-75 mt-5'>
      <img className='w-4' src={assets.play_icon} alt="play" />
      <img className='w-4' src={assets.mic_icon} alt="mic" />
      <img className='w-4' src={assets.queue_icon} alt="queue" />
      <img className='w-4' src={assets.speaker_icon} alt="speaker" />
      <img className='w-4' src={assets.volume_icon} alt="volume" />
      <div className='w-10 bg-slate-50 h-1 rounded'></div>
      <img className='w-4' src={assets.mini_player_icon} alt="miniplayer" />
      <img className='w-4' src={assets.zoom_icon} alt="zoom" />
      </div>

      

    </div>
  )
}

export default Player