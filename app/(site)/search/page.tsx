'use client';

import { useState, useEffect } from 'react';
import { HiOutlineSearch as Search } from 'react-icons/hi';

import useToken from '@/hooks/useToken';
import fetchWebApi from '@/utils/fetchWebApi';
import getArtists from '@/utils/getArtists';
import Track, { TrackType } from '@/components/Track';
import AlbumPreview from '@/components/AlbumPreview';
import PlaylistPreview from '@/components/PlaylistPreview';
import { CollectionType } from '@/components/Preview';
import Row from '@/components/Row';

const SearchPage = () => {
  const token = useToken();
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    async function search(query: string) {
      const params = `q=${query}&type=album,playlist,track&limit=5`;
      const res = await fetchWebApi(token, `search?${params}`, 'GET');
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
            album: album.name,
            album_id: album.id,
          };
        })
      );
      setAlbums(
        albums.items.map((album: any) => {
          const { id, name, images, artists } = album;
          return {
            id: id,
            name: name,
            by: getArtists(artists),
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
            by: `By ${owner.display_name}`,
            image: images[0].url,
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
      <h1 className='font-bold text-4xl mb-5'>
        Search for a song, album, or playlist
      </h1>
      <section className='relative mb-10'>
        <Search
          size={20}
          className='absolute top-1/2 translate-y-[-50%] left-4'
        />
        <input
          type='search'
          placeholder='What do you want to listen to?'
          onChange={(e) => setQuery(e.target.value)}
          className='w-96 rounded-full p-4 pl-12 bg-white/[0.03]'
        />
      </section>
      <section className='flex flex-col gap-8'>
        {tracks.length !== 0 && (
          <div>
            <h2 className='font-semibold text-2xl mb-5'>Songs</h2>
            <ul>
              {tracks.map((track: TrackType) => (
                <li key={track.uri}>
                  <Track track={track} />
                </li>
              ))}
            </ul>
          </div>
        )}
        {albums.length !== 0 && (
          <div>
            <h2 className='font-semibold text-2xl mb-5'>Albums</h2>
            <Row>
              {albums.map((album: CollectionType) => (
                <li
                  key={album.id}
                  className='w-[120px] md:w-[160px] lg:w-[200px]'
                >
                  <AlbumPreview album={album} />
                </li>
              ))}
            </Row>
          </div>
        )}
        {playlists.length !== 0 && (
          <div>
            <h2 className='font-semibold text-2xl mb-5'>Playlists</h2>
            <Row>
              {playlists.map((playlist: CollectionType) => (
                <li
                  key={playlist.id}
                  className='w-[120px] md:w-[160px] lg:w-[200px]'
                >
                  <PlaylistPreview playlist={playlist} />
                </li>
              ))}
            </Row>
          </div>
        )}
      </section>
    </>
  );
};

export default SearchPage;
