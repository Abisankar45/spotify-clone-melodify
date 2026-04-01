import React from 'react'

const SongItems = (props) => {
  return (
    <div className='max-w-50 min-h-25 p-2 px-3 rounded-2xl cursor-pointer hover:bg-[#ffffff26]'>
        <img className='rounded min-w-[155px]' src={props.image} alt="" />
    </div>
  )
}

export default SongItems