'use client';

import { useState, useEffect } from 'react';
import useToken from '../hooks/useToken';
import Album, { AlbumType } from './Album';

const Albums = () => {
  const token = useToken();
  const [albums, setAlbums] = useState<any[] | null>(null);

  useEffect(() => {
    async function fetchWebApi(
      endpoint: string,
      method: string,
      body?: object
    ) {
      const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method,
        body: JSON.stringify(body),
      });
      const json = await res.json();
      const albums = json.items.map((item: any) => {
        const { artists, id, images, name } = item.track.album;
        return { id, name, artist: artists[0].name, image: images[1].url };
      });
      return albums.filter(
        (album: AlbumType, index: number) =>
          index === albums.findIndex((a: AlbumType) => album.id === a.id)
      ); // filter out duplicates
    }
    async function getNewReleases() {
      setAlbums(await fetchWebApi('v1/me/player/recently-played', 'GET'));
    }

    getNewReleases();
  }, [token]);

  return (
    <section>
      <h2>Albums</h2>
      <div>
        {albums &&
          albums.map((album: AlbumType) => {
            return <Album key={album.id} album={album} />;
          })}
      </div>
    </section>
  );
};

export default Albums;
