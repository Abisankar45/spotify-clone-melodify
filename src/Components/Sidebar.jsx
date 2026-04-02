import React from "react"
import { assets } from '../assets/assets'
import { useNavigate } from "react-router-dom"

const LibraryCard = ({ title, description, buttonLabel }) => (
  <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start gap-1 pl-4">
    <h1>{title}</h1>
    <p className="font-light">{description}</p>
    <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
      {buttonLabel}
    </button>
  </div>
)

function Sidebar() {
  const nav = useNavigate();
  return (
    <div className='w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex'>

      <div className='bg-[#121212] h-[15%] rounded flex flex-col justify-around'>
        <div onClick={()=>nav('/')} className='flex items-center gap-3 pl-8 cursor-pointer'>
          <img className="w-6" src={assets.home_icon} alt="home" />
          <p className='font-bold'>Home</p>
        </div>
        <div className='flex items-center gap-3 pl-8 cursor-pointer'>
          <img className="w-6" src={assets.search_icon} alt="search" />
          <p className='font-bold'>Search</p>
        </div>
      </div>

      <div className="bg-[#121212] h-[85%] rounded">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img className="w-6" src={assets.stack_icon} alt="your library" />
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-5" src={assets.arrow_icon} alt="expand" />
            <img className="w-5" src={assets.plus_icon} alt="add" />
          </div>
        </div>

        <LibraryCard
          title="Create Your First Playlist"
          description="It's easy, we will help you"
          buttonLabel="Create Playlist"
        />
        <LibraryCard
          title="Find Some Podcasts to Follow"
          description="We'll keep you updated on new episodes"
          buttonLabel="Browse Podcasts"
        />
      </div>

    </div>
  )
}

export default Sidebar