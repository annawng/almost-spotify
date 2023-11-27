import { useState } from 'react';
import { HiPause as Pause } from 'react-icons/hi2';
import {
  RiSkipBackFill as Back,
  RiSkipForwardFill as Forward,
  RiPlayFill as Play,
} from 'react-icons/ri';
import { RxShuffle as Shuffle, RxLoop as Loop } from 'react-icons/rx';

import { useDeviceId } from '@/contexts/DeviceContext';
import formatTime from '@/utils/formatTime';
import fetchWebApi from '@/utils/fetchWebApi';
import useToken from '@/hooks/useToken';

const PlaybackControls = ({
  disabled = false,
  isPlaying = false,
  position,
  duration,
  togglePlay,
  previousTrack,
  nextTrack,
}: {
  disabled?: boolean;
  isPlaying?: boolean;
  position: number;
  duration: number;
  togglePlay: () => void;
  previousTrack: () => void;
  nextTrack: () => void;
}) => {
  const token = useToken();
  const deviceId = useDeviceId();

  const [shouldShuffle, setShouldShuffle] = useState(false);
  const [shouldLoop, setShouldLoop] = useState(false);

  const toggleShuffle = async () => {
    await fetchWebApi(
      token,
      `v1/me/player/shuffle?device_id=${deviceId}&state=${!shouldShuffle}`,
      'PUT'
    );
    setShouldShuffle(!shouldShuffle);
  };

  const toggleLoop = async () => {
    await fetchWebApi(
      token,
      `v1/me/player/repeat?device_id=${deviceId}&state=${
        shouldLoop ? 'off' : 'context'
      }`,
      'PUT'
    );
    setShouldLoop(!shouldLoop);
  };

  return (
    <>
      <div className='flex items-center gap-4'>
        <button
          disabled={disabled}
          className={`disabled:opacity-40 hover:opacity-100 transition ${
            shouldShuffle
              ? 'text-green-500 opacity-100'
              : 'text-white opacity-60'
          }`}
          onClick={toggleShuffle}
        >
          <Shuffle size={20} />
        </button>
        <button
          disabled={disabled}
          className='text-white opacity-60 disabled:opacity-40 hover:opacity-100 transition'
          onClick={previousTrack}
        >
          <Back size={24} />
        </button>
        <button
          disabled={disabled}
          className='bg-white rounded-full p-[2px] disabled:opacity-40 text-black hover:scale-105 transition'
          onClick={togglePlay}
        >
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </button>
        <button
          disabled={disabled}
          className='text-white opacity-60 disabled:opacity-40 hover:opacity-100 transition'
          onClick={nextTrack}
        >
          <Forward size={24} />
        </button>
        <button
          disabled={disabled}
          className={`disabled:opacity-40 hover:opacity-100 transition ${
            shouldLoop ? 'text-green-500 opacity-100' : 'text-white opacity-60'
          }`}
          onClick={toggleLoop}
        >
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
