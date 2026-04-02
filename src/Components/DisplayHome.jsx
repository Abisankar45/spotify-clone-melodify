import React from 'react'
import Navbar from './Navbar'
import { albumsData, songsData } from '../assets/assets'
import AlbumItems from './AlbumItems'
import SongItems from './SongItems'

function DisplayHome() {
    return (
        <>
            <Navbar />
            <div className='mb-4'>
                <h1 className='my-5 font-bold text-2xl'>Your Top Playlist</h1>
                <div className='flex overflow-auto'>
                    {albumsData.map((item) => (
                        <AlbumItems
                            key={item.id}
                            name={item.name}
                            desc={item.desc}
                            id={item.id}
                            image={item.image}
                        />
                    ))}
                </div>
            </div>
            <div className='mb-4'>
                <h1 className='my-5 font-bold text-2xl'>Recently Played</h1>
                <div className='flex overflow-auto'>
                    {songsData.map((item) => (
                        <SongItems
                            key={item.id}
                            name={item.name}
                            desc={item.desc}
                            id={item.id}
                            image={item.image}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default DisplayHome;