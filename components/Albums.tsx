'use client';

import { useState, useEffect } from 'react';

import Album, { AlbumType } from './Album';
import useToken from '@/hooks/useToken';
import fetchWebApi from '@/utils/fetchWebApi';

const Albums = () => {
  const token = useToken();
  const [albums, setAlbums] = useState<any[] | null>(null);

  useEffect(() => {
    async function getSavedAlbums() {
      const json = await fetchWebApi(token, 'v1/me/albums', 'GET');
      const albums = json.items.map((item: any) => {
        const { artists, id, images, name } = item.album;
        return { id, name, artist: artists[0].name, image: images[1].url };
      });
      setAlbums(albums);
    }

    getSavedAlbums();
  }, [token]);

  return (
    <section>
      <h2 className='font-medium text-lg mb-4'>Saved albums</h2>
      <div className='max-w-full grid grid-cols-5 grid-flow-row gap-4'>
        {albums &&
          albums.map((album: AlbumType) => {
            return <Album key={album.id} album={album} />;
          })}
      </div>
    </section>
  );
};

export default Albums;
