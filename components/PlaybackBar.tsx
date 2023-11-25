'use client';

import { twMerge } from 'tailwind-merge';
import { PiQueue as Queue } from 'react-icons/pi';
import { IoVolumeMediumOutline as Volume } from 'react-icons/io5';
import Slider from '@mui/material/Slider';
import PlaybackControls from './PlaybackControls';

const PlaybackBar = ({ className }: { className?: string }) => {
  return (
    <section
      className={twMerge(
        'flex justify-between items-center px-6 py-3',
        className
      )}
    >
      <div className='w-[30%]'></div>
      <PlaybackControls />
      <div className='w-[30%] flex items-center gap-4 justify-end'>
        <button>
          <Queue size={24} />
        </button>
        <div className='flex items-center gap-2'>
          <button>
            <Volume size={28} />
          </button>
          <Slider
            aria-label='Volume'
            defaultValue={100}
            className='w-24 text-white'
          />
        </div>
      </div>
    </section>
  );
};

export default PlaybackBar;
