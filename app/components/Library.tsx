'use client';

import { FC, useMemo } from 'react';
import SidebarItem from './SidebarItem';
import { RxCounterClockwiseClock as Clock } from 'react-icons/rx';
import { HiOutlineHeart as Heart } from 'react-icons/hi';
import { RiAlbumLine as Album } from 'react-icons/ri';
import { usePathname } from 'next/navigation';

interface LibraryProps {}

const Library: FC<LibraryProps> = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: 'Recents',
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
        href: '/songs',
        icon: Heart,
      },
    ],
    [pathname]
  );

  return (
    <section>
      <h2 className='uppercase text-sm text-neutral-400 pb-4'>Library</h2>
      <nav className='flex flex-col gap-6'>
        {routes.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </nav>
    </section>
  );
};

export default Library;
