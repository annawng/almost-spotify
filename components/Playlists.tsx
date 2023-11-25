import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AiOutlinePlus } from 'react-icons/ai';

import useToken from '@/hooks/useToken';
import fetchWebApi from '@/utils/fetchWebApi';

const Playlists = () => {
  const token = useToken();
  const [playlists, setPlaylists] = useState<any[] | null>(null);

  useEffect(() => {
    async function getPlaylists() {
      const res = await fetchWebApi(token, 'v1/me/playlists?limit=50', 'GET');
      const json = await res.json();
      const playlists = json.items.map((item: any) => {
        const { id, name } = item;
        return { id, name };
      });
      setPlaylists(playlists);
    }

    getPlaylists();
  }, [token]);

  const onClick = () => {
    // handle upload
  };
  return (
    <div className='h-full flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <div className='inline-flex items-center gap-x-2'>
          <h2 className='text-neutral-400 font-medium text-md'>Playlists</h2>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className='text-neutral-400 cursor-pointer hover:text-white transition'
        />
      </div>
      <div className='flex flex-col gap-2 overflow-y-scroll'>
        {playlists &&
          playlists.map((playlist: any) => (
            <Link
              href={`/playlist/${playlist.id}`}
              key={playlist.id}
              className='text-neutral-400 hover:text-white transition'
            >
              {playlist.name}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Playlists;
