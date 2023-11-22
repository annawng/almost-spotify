'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import useToken from '@/hooks/useToken';
import fetchWebApi from '@/utils/fetchWebApi';
import Track, { TrackType } from '@/components/Track';
import getArtists from '@/utils/getArtists';
import useName from '@/hooks/useName';

interface CollectionInfo {
  name: string;
  image: string;
  owner: string;
}

const Collection = ({
  endpoint,
  isPlaylist,
  isLikedSongs,
}: {
  endpoint: string;
  isPlaylist?: boolean; // otherwise is an album
  isLikedSongs?: boolean;
}) => {
  const token = useToken();
  const [tracks, setTracks] = useState<TrackType[]>();
  const [collectionInfo, setCollectionInfo] = useState<CollectionInfo>();

  const userName = useName();

  useEffect(() => {
    async function getPlaylist() {
      const json = await fetchWebApi(token, `v1/${endpoint}?limit=50`, 'GET');

      if (isPlaylist) {
        if (isLikedSongs) {
          setCollectionInfo({
            name: 'Liked Songs',
            image: 'https://misc.scdn.co/liked-songs/liked-songs-300.png', // TODO: use some random heart photo idk
            owner: userName,
          });
        } else {
          const { name, images, owner } = json;
          setCollectionInfo({
            name,
            image: images[0].url,
            owner: owner.display_name,
          });
        }
      } else {
        const { name, images, artists } = json;
        setCollectionInfo({
          name,
          image: images[0].url,
          owner: getArtists(artists),
        });
      }

      const items = json.tracks ? json.tracks.items : json.items;

      const songs = items.map((item: any) => {
        if (isPlaylist) {
          const { album, artists, duration_ms, id, name } = item.track;
          return {
            album: album.name,
            image: album.images[1].url,
            artist: getArtists(artists),
            duration_ms,
            id,
            name,
          };
        } else {
          const { artists, duration_ms, id, name } = item;
          return {
            artist: getArtists(artists),
            duration_ms,
            id,
            name,
          };
        }
      });

      setTracks(songs);
    }

    getPlaylist();
  }, [token, userName, endpoint, isPlaylist, isLikedSongs]);

  return (
    <>
      {collectionInfo && (
        <div>
          <div className='flex items-end gap-8 mb-16'>
            <Image
              src={collectionInfo.image}
              alt=''
              width={240}
              height={240}
              className='aspect-square object-cover'
            />
            <div className='flex flex-col gap-2'>
              <p className='text-neutral-400 uppercase text-sm'>
                {isPlaylist ? 'Playlist' : 'Album'}
              </p>
              <h1 className='font-bold text-5xl'>{collectionInfo.name}</h1>
              <p className='font-medium'>{collectionInfo.owner}</p>
            </div>
          </div>
          <div className='flex flex-col'>
            {tracks &&
              tracks.map((track: TrackType, index: number) => (
                <Track key={track.id} track={track} index={index + 1} />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Collection;
