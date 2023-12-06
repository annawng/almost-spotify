'use client';

import React, { useState, useEffect } from 'react';

import useToken from '@/hooks/useToken';
import PlaybackBar from './PlaybackBar';
import { DeviceContextProvider } from '@/contexts/DeviceContext';

const WebPlayback = ({ children }: { children: React.ReactNode }) => {
  const token = useToken();
  const [player, setPlayer] = useState<any>();
  const [deviceId, setDeviceId] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(undefined);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    (window as any).onSpotifyWebPlaybackSDKReady = () => {
      const player = new (window as any).Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (cb: React.FC) => {
          cb(token);
        },
      });

      setPlayer(player);

      player.addListener('ready', ({ device_id }: { device_id: string }) => {
        setDeviceId(device_id);
      });

      player.addListener(
        'not_ready',
        ({ device_id }: { device_id: string }) => {
          console.log('Device ID has gone offline', device_id);
        }
      );

      player.addListener(
        'player_state_changed',
        ({
          position,
          paused,
          track_window: { current_track },
        }: {
          position: number;
          duration: number;
          paused: boolean;
          track_window: { current_track: any };
        }) => {
          setCurrentTrack(current_track);
          setIsPlaying(!paused);
          setPosition(position);
        }
      );

      player.connect();
    };
  }, [token]);

  return (
    <DeviceContextProvider value={deviceId}>
      <main className='h-full overflow-y-scroll p-6'>{children}</main>
      {player && (
        <PlaybackBar
          className='col-span-2 w-full'
          isPlaying={isPlaying}
          currentTrack={currentTrack}
          position={position}
          togglePlay={() => {
            player.togglePlay();
          }}
          previousTrack={() => {
            player.previousTrack();
          }}
          nextTrack={() => {
            player.nextTrack();
          }}
          setVolume={(volume: number) => {
            player.setVolume(volume);
          }}
        />
      )}
    </DeviceContextProvider>
  );
};

export default WebPlayback;
