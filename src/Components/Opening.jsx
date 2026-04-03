import React from 'react';
import background from '../assets/background-intro.mp4';

const Opening = ({ onEnd }) => {
  return (
    <div className='h-screen bg-[#121212] flex items-center justify-center'>
      <video
        className='w-full object-fill mix-blend-screen'
        src={background}
        autoPlay
        muted
        onEnded={onEnd}
      />
    </div>
  );
};

export default Opening;