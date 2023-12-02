'use client';

import { useState, useEffect } from 'react';
import { HiOutlineSearch as Search } from 'react-icons/hi';

import useToken from '@/hooks/useToken';
import fetchWebApi from '@/utils/fetchWebApi';
import getArtists from '@/utils/getArtists';

const SearchPage = () => {
  const token = useToken();
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    async function search(query: string) {
      const params = `q=${query}&type=album,playlist,track&limit=5`;
      const res = await fetchWebApi(token, `v1/search?${params}`, 'GET');
      const json = await res.json();
      const { albums, playlists, tracks } = json;
      setTracks(
        tracks.items.map((track: any) => {
          const { uri, name, album, artists, duration_ms } = track;
          return {
            uri: uri,
            name: name,
            artist: getArtists(artists),
            image: album.images[1].url,
            duration_ms: duration_ms,
          };
        })
      );
      setAlbums(
        albums.items.map((album: any) => {
          const { id, name, images, artists } = album;
          return {
            id: id,
            name: name,
            artist: getArtists(artists),
            image: images[1].url,
          };
        })
      );
      setPlaylists(
        playlists.items.map((playlist: any) => {
          const { id, name, images, owner } = playlist;
          return {
            id: id,
            name: name,
            owner: owner,
            image: images[1].url,
          };
        })
      );
    }

    // Searches when user stops typing
    let timer = setTimeout(() => {
      if (query.trim()) {
        search(query);
      } else {
        setTracks([]);
        setAlbums([]);
        setPlaylists([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [token, query]);

  return (
    <>
      <h1 className='font-bold text-3xl mb-6'>Search for a song or album</h1>
      <div className='relative mb-12'>
        <Search
          size={20}
          className='absolute top-1/2 translate-y-[-50%] left-4'
        />
        <input
          type='search'
          placeholder='What do you want to listen to?'
          onChange={(e) => setQuery(e.target.value)}
          className='w-96 rounded-full p-4 pl-12'
        />
      </div>
      <div>
        <h2>Songs</h2>
      </div>
      <div>
        <h2>Albums</h2>
      </div>
      <div>
        <h2>Playlists</h2>
      </div>
    </>
  );
};

export default SearchPage;
