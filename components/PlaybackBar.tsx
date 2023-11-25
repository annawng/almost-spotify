'use client';

import { twMerge } from 'tailwind-merge';

import PlaybackControls from './PlaybackControls';
import SecondaryControls from './SecondaryControls';

const PlaybackBar = ({ className }: { className?: string }) => {
  return (
    <section
      className={twMerge(
        'flex justify-between items-center px-6 py-3',
        className
      )}
    >
      <div className='w-[30%]'></div>
      <div className='flex flex-col items-center gap-1 w-[40%] max-w-[722px]'>
        <PlaybackControls />
      </div>
      <div className='w-[30%] flex items-center gap-4 justify-end'>
        <SecondaryControls />
      </div>
    </section>
  );
};

export default PlaybackBar;
