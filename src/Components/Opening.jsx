import React from 'react'
import background from '../assets/background-intro.mp4'

const Opening = () => {
    return (
        <div className='h-screen bg-[#121212] flex items-center justify-center'>
            <video
                className='w-full object-cover mix-blend-screen'
                src={background}
                preload='auto'
                autoPlay
                loop
                muted
            />
        </div>
    );
};

export default Opening;