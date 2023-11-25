'use client';

import { useState } from 'react';
import { PiQueue as Queue } from 'react-icons/pi';
import { GoMute as Muted, GoUnmute as Unmuted } from 'react-icons/go';
import Slider from '@mui/material/Slider';

import fetchWebApi from '@/utils/fetchWebApi';
import useToken from '@/hooks/useToken';

const SecondaryControls = () => {
  const token = useToken();
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);

  async function setPlaybackVolume(volume: number) {
    await fetchWebApi(
      token,
      `v1/me/player/volume?volume_percent=${volume}`,
      'PUT'
    );
  }

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
              setPlaybackVolume(volume);
            } else {
              setIsMuted(true);
              setPlaybackVolume(0);
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
            setPlaybackVolume(newValue as number);
          }}
          className='w-24 text-white'
        />
      </div>
    </>
  );
};

export default SecondaryControls;
