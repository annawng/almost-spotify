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
  ownerImage: string;
}

enum Owner {
  CurrentUser,
  User,
  Artist,
}

const Collection = ({
  endpoint,
  isPlaylist = false,
  isLikedSongs = false,
  showHeader = true,
  showIndex = true,
  setIsLoaded,
}: {
  endpoint: string;
  isPlaylist?: boolean; // otherwise is an album
  isLikedSongs?: boolean;
  showHeader?: boolean;
  showIndex?: boolean;
  setIsLoaded?: () => void;
}) => {
  const token = useToken();
  const [tracks, setTracks] = useState<TrackType[]>();
  const [collectionInfo, setCollectionInfo] = useState<CollectionInfo>();

  const userName = useName();

  useEffect(() => {
    async function getOwnerImage(owner: Owner, id?: string) {
      const res = await fetchWebApi(
        token,
        owner === Owner.CurrentUser
          ? 'me'
          : owner === Owner.User
          ? `users/${id}`
          : `artists/${id}`,
        'GET'
      );
      const json = await res.json();
      return json.images[0].url;
    }

    async function getPlaylist() {
      const res = await fetchWebApi(token, endpoint, 'GET');
      const json = await res.json();

      if (showHeader) {
        if (isPlaylist) {
          if (isLikedSongs) {
            setCollectionInfo({
              name: 'Liked Songs',
              image: 'https://misc.scdn.co/liked-songs/liked-songs-300.png',
              owner: userName,
              ownerImage: await getOwnerImage(Owner.CurrentUser),
            });
          } else {
            const { name, images, owner } = json;
            setCollectionInfo({
              name,
              image: images[0].url,
              owner: owner.display_name,
              ownerImage: await getOwnerImage(Owner.User, owner.id),
            });
          }
        } else {
          const { name, images, artists } = json;
          setCollectionInfo({
            name,
            image: images[0].url,
            owner: getArtists(artists),
            ownerImage: await getOwnerImage(Owner.Artist, artists[0].id),
          });
        }
      }

      const items = json.tracks ? json.tracks.items : json.items;

      const songs = items.map((item: any) => {
        if (isPlaylist) {
          const { album, artists, duration_ms, name, uri } = item.track ?? item;
          return {
            album: album.name,
            album_id: album.id,
            image: album.images[1].url,
            artist: getArtists(artists),
            duration_ms,
            name,
            uri,
            context_uri: json.id ? `spotify:playlist:${json.id}` : undefined,
          };
        } else {
          const { artists, duration_ms, name, uri } = item;
          return {
            artist: getArtists(artists),
            duration_ms,
            name,
            uri,
            context_uri: json.uri,
          };
        }
      });

      setTracks(songs);
      if (setIsLoaded) {
        setIsLoaded();
      }
    }

    getPlaylist();
  }, [
    token,
    userName,
    endpoint,
    isPlaylist,
    isLikedSongs,
    showHeader,
    setIsLoaded,
  ]);

  return (
    <>
      {collectionInfo && showHeader && (
        <CollectionHeader {...collectionInfo} isPlaylist={isPlaylist} />
      )}
      <div className='flex flex-col gap-1 md:gap-0 max-w-full'>
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
