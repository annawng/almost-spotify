import React, { useEffect, useState } from 'react';
import Link from 'next/link';

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

  return (
    <div className='h-full flex flex-col gap-4'>
      <div className='inline-flex items-center gap-x-2'>
        <h2 className='text-neutral-400 uppercase text-sm'>Playlists</h2>
      </div>
      <div className='flex flex-col gap-2 overflow-y-scroll'>
        {playlists &&
          playlists.map((playlist: any) => (
            <div key={playlist.id} className='max-w-full'>
              <Link href={`/playlist/${playlist.id}`}>
                <p className='text-neutral-400 hover:text-white transition truncate'>
                  {playlist.name}
                </p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Playlists;
