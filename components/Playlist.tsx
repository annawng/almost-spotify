'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import useToken from '@/hooks/useToken';
import fetchWebApi from '@/utils/fetchWebApi';
import PlaylistItem, { TrackType } from '@/components/PlaylistItem';

interface PlaylistInfo {
  name: string;
  image: string;
  owner: string;
}

const Playlist = ({ id }: { id: string }) => {
  const token = useToken();
  const [tracks, setTracks] = useState<TrackType[]>();
  const [playlistInfo, setPlaylistInfo] = useState<PlaylistInfo>();

  useEffect(() => {
    async function getPlaylist() {
      const json = await fetchWebApi(token, `v1/playlists/${id}`, 'GET');
      const { name, images, tracks, owner } = json;
      setPlaylistInfo({
        name,
        image: images[0].url,
        owner: owner.display_name,
      });

      const songs = tracks.items.map((item: any) => {
        const { album, artists, duration_ms, id, name } = item.track;
        return {
          album: album.name,
          image: album.images[1].url,
          artist: artists[0].name,
          duration_ms,
          id,
          name,
        };
      });

      setTracks(songs);
    }

    getPlaylist();
  }, [token, id]);

  return (
    <>
      {playlistInfo && (
        <div>
          <div className='flex items-end gap-8 mb-16'>
            <Image
              src={playlistInfo.image}
              alt=''
              width={240}
              height={240}
              className='aspect-square object-cover'
            />
            <div className='flex flex-col gap-4'>
              <h1 className='font-bold text-5xl'>{playlistInfo.name}</h1>
              <p className='font-medium'>{playlistInfo.owner}</p>
            </div>
          </div>
          <div className='flex flex-col'>
            {tracks &&
              tracks.map((track: TrackType, index: number) => (
                <PlaylistItem key={track.id} track={track} index={index + 1} />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Playlist;
