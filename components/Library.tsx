'use client';

import { useMemo } from 'react';
import SidebarItem from './SidebarItem';
import { RxCounterClockwiseClock as Clock } from 'react-icons/rx';
import { HiOutlineHeart as Heart } from 'react-icons/hi';
import { RiAlbumLine as Album } from 'react-icons/ri';
import { usePathname } from 'next/navigation';

const Library = ({ onClick }: { onClick?: () => void }) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: 'History',
        active: pathname === '/history',
        href: '/history',
        icon: Clock,
      },
      {
        label: 'Albums',
        active: pathname === '/albums',
        href: '/albums',
        icon: Album,
      },
      {
        label: 'Liked Songs',
        active: pathname === '/liked-songs',
        href: '/liked-songs',
        icon: Heart,
      },
    ],
    [pathname]
  );

  return (
    <section>
      <p className='uppercase text-sm text-neutral-400 pb-4'>Library</p>
      <nav className='flex flex-col gap-6'>
        {routes.map((item) => (
          <SidebarItem
            key={item.label}
            onClick={onClick ?? undefined}
            {...item}
          />
        ))}
      </nav>
    </section>
  );
};

export default Library;
