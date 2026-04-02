import React, { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const SongItems = (props) => {
  const {playWithId} = useContext(PlayerContext);
  return (
    <div onClick={()=>playWithId(props.id)}  className='max-w-50 min-h-25 p-2 px-3 rounded cursor-pointer hover:bg-[#2bff0026]'>
        <img className='rounded min-w-[155px] max-h-[189px]' src={props.image} alt="" />
        <p className='font-bold mt-2 mb-1'>{props.name}</p>
        <p className='text-slate-200 text-sm'>{props.desc}</p>
    </div>
  )
}

export default SongItems