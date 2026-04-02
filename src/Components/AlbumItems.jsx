import React from 'react'
import { useNavigate } from 'react-router-dom'

const AlbumItems = ({ id, image, name, desc }) => {
    const nav = useNavigate();

    return (
        <div
            onClick={() => nav(`/album/${id}`)}
            className='min-w-45 p-1 px-3 rounded cursor-pointer hover:bg-[#2bff0026]'
        >
            <img className='rounded' src={image} alt={name} />
            <p className='font-bold mt-2 mb-1'>{name}</p>
            <p className='text-slate-200 text-sm'>{desc}</p>
        </div>
    );
};

export default AlbumItems;