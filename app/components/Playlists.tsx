import React from 'react';

import { AiOutlinePlus } from 'react-icons/ai';
import Box from './Box';

const Playlists = () => {
  const onClick = () => {
    // handle upload
  };
  return (
    <div className='h-full flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <div className='inline-flex items-center gap-x-2'>
          <h2 className='text-neutral-400 font-medium text-md'>Playlists</h2>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className='text-neutral-400 cursor-pointer hover:text-white transition'
        />
      </div>
      <div className='flex flex-col gap-2 overflow-y-auto'>
        Your playlists will go here
      </div>
    </div>
  );
};

export default Playlists;
