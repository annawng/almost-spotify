import formatTime from '@/utils/formatTime';
import { HiPause as Pause } from 'react-icons/hi2';
import {
  RiSkipBackFill as Back,
  RiSkipForwardFill as Forward,
  RiPlayFill as Play,
} from 'react-icons/ri';
import { RxShuffle as Shuffle, RxLoop as Loop } from 'react-icons/rx';

const PlaybackControls = ({
  disabled = false,
  isPlaying = false,
  position,
  duration,
  togglePlay,
}: {
  disabled?: boolean;
  isPlaying?: boolean;
  position: number;
  duration: number;
  togglePlay: () => void;
}) => {
  return (
    <>
      <div className='flex items-center gap-4'>
        <button disabled={disabled} className='disabled:opacity-40'>
          <Shuffle size={20} />
        </button>
        <button disabled={disabled} className='disabled:opacity-40'>
          <Back size={24} />
        </button>
        <button
          disabled={disabled}
          className='bg-white rounded-full p-[2px] disabled:opacity-40 text-black'
          onClick={togglePlay}
        >
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </button>
        <button disabled={disabled} className='disabled:opacity-40'>
          <Forward size={24} />
        </button>
        <button disabled={disabled} className='disabled:opacity-40'>
          <Loop size={20} />
        </button>
      </div>
      <div className='flex gap-2 w-full items-center'>
        <p className='shrink-0'>{disabled ? '-:--' : formatTime(position)}</p>
        <progress
          className='progress h-1'
          value={position && duration && position / duration}
        ></progress>
        <p className='shrink-0'>{disabled ? '-:--' : formatTime(duration)}</p>
      </div>
    </>
  );
};

export default PlaybackControls;
