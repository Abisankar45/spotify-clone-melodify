import React, { useContext } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { albumsData, assets, songsData } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const DisplayAlbum = () => {
    const { id } = useParams();
    const albumDataLocal = albumsData[id];
    const { playWithId } = useContext(PlayerContext);

    if (!albumDataLocal) {
        return <p className='text-white p-8'>Album not found.</p>;
    }

    return (
        <>
            <Navbar />
            <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
                <img className='w-48 rounded' src={albumDataLocal.image} alt={albumDataLocal.name} />
                <div className='flex flex-col'>
                    <p>Playlist</p>
                    <h1 className='text-4xl font-bold mb-4 md:text-6xl'>{albumDataLocal.name}</h1>
                    <h4>{albumDataLocal.desc}</h4>
                    <p className='mt-2'>
                        <img className='inline-block w-5 mb-1' src={assets.spotify_logo} alt="Melodify" />
                        <b className='text-green-700'> Melodify</b> 45,45,264 likes |
                        <b> 50 Songs </b> | about 2hr 35 min
                    </p>
                </div>
            </div>

            <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 p-3 border-b-2 text-[#a7a7a7] font-bold rounded'>
                <p><b className='mr-2'>#</b>Title</p>
                <p>Album</p>
                <p className='hidden md:block'>Date Added</p>
                <p>
                    <img className='w-4 inline mr-1 mb-0.5' src={assets.clock_icon} alt="" />
                    Duration
                </p>
            </div>

            {songsData.map((item, index) => (
                <div
                    onClick={() => playWithId(item.id)}
                    key={item.id}
                    className='grid grid-cols-3 sm:grid-cols-4 gap-3 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff07] cursor-pointer'
                >
                    <p className='text-white'>
                        <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
                        <img className='inline w-13 h-15 mr-1 rounded' src={item.image} alt={item.name} />
                        {item.name}
                    </p>
                    <p className='text-[15px]'>{albumDataLocal.name}</p>
                    <p className='text-[15px]'>3 Days</p>
                    <p className='text-[15px] ml-5'>{item.duration}</p>
                </div>
            ))}
        </>
    );
};

export default DisplayAlbum;