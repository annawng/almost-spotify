'use client';

import { useState, useEffect } from 'react';

import useToken from '@/hooks/useToken';
import fetchWebApi from '@/utils/fetchWebApi';
import Track, { TrackType } from '@/components/Track';
import getArtists from '@/utils/getArtists';
import useName from '@/hooks/useName';
import CollectionHeader from './CollectionHeader';

interface CollectionInfo {
  name: string;
  image: string;
  owner: string;
}

const Collection = ({
  endpoint,
  isPlaylist = false,
  isLikedSongs = false,
  showHeader = true,
  showIndex = true,
}: {
  endpoint: string;
  isPlaylist?: boolean; // otherwise is an album
  isLikedSongs?: boolean;
  showHeader?: boolean;
  showIndex?: boolean;
}) => {
  const token = useToken();
  const [tracks, setTracks] = useState<TrackType[]>();
  const [collectionInfo, setCollectionInfo] = useState<CollectionInfo>();

  const userName = useName();

  useEffect(() => {
    async function getPlaylist() {
      const res = await fetchWebApi(token, `v1/${endpoint}?limit=50`, 'GET');
      const json = await res.json();

      if (showHeader) {
        if (isPlaylist) {
          if (isLikedSongs) {
            setCollectionInfo({
              name: 'Liked Songs',
              image: 'https://misc.scdn.co/liked-songs/liked-songs-300.png',
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
  }, [token, userName, endpoint, isPlaylist, isLikedSongs, showHeader]);

  return (
    <>
      {collectionInfo && showHeader && (
        <CollectionHeader {...collectionInfo} isPlaylist={isPlaylist} />
      )}
      <div className='flex flex-col'>
        {tracks &&
          tracks.map((track: TrackType, index: number) => (
            <Track
              key={index}
              track={track}
              index={showIndex ? index + 1 : undefined}
            />
          ))}
      </div>
    </>
  );
};

export default Collection;
