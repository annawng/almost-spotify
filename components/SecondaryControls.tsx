'use client';

import { useState } from 'react';
import { PiQueue as Queue } from 'react-icons/pi';
import { GoMute as Muted, GoUnmute as Unmuted } from 'react-icons/go';
import Slider from '@mui/material/Slider';

const SecondaryControls = ({
  updateVolume,
}: {
  updateVolume: (volume: number) => void;
}) => {
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          // TODO: display queue
        }}
      >
        <Queue size={24} title='Queue' />
      </button>
      <div className='flex items-center gap-2'>
        <button
          onClick={() => {
            if (isMuted) {
              setIsMuted(false);
              updateVolume(volume / 100);
            } else {
              setIsMuted(true);
              updateVolume(0);
            }
          }}
        >
          {isMuted ? (
            <Muted size={24} title='Unmute' />
          ) : (
            <Unmuted size={24} title='Mute' />
          )}
        </button>
        <Slider
          aria-label='Volume'
          value={isMuted ? 0 : volume}
          onChange={(_, newValue) => {
            setVolume(newValue as number);
          }}
          onChangeCommitted={(_, newValue) => {
            setVolume(newValue as number);
            updateVolume((newValue as number) / 100);
          }}
          className='w-24 text-white'
        />
      </div>
    </>
  );
};

export default SecondaryControls;
