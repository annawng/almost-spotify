import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import useToken from '@/hooks/useToken';
import fetchWebApi from '@/utils/fetchWebApi';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

const Playlists = () => {
  const pathname = usePathname();
  const token = useToken();
  const [playlists, setPlaylists] = useState<any[] | null>(null);

  useEffect(() => {
    async function getPlaylists() {
      const res = await fetchWebApi(token, 'me/playlists?limit=50', 'GET');
      const json = await res.json();
      const playlists = json.items.map((item: any) => {
        const { id, name } = item;
        return { id, name, active: pathname === `/playlist/${id}` };
      });
      setPlaylists(playlists);
    }

    getPlaylists();
  }, [token, pathname]);

  return (
    <div className='h-full flex flex-col gap-4'>
      <div className='inline-flex items-center gap-x-2'>
        <p className='text-neutral-400 uppercase text-sm'>Playlists</p>
      </div>
      <div className='flex flex-col gap-2 overflow-y-scroll pb-6'>
        {playlists &&
          playlists.map((playlist: any) => (
            <div key={playlist.id} className='max-w-full'>
              <Link href={`/playlist/${playlist.id}`}>
                <p
                  className={twMerge(
                    'text-neutral-400 hover:text-white transition truncate',
                    playlist.active && 'text-white'
                  )}
                >
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
