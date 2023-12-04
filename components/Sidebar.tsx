'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { HiOutlineSearch as Search } from 'react-icons/hi';
import { HiOutlineHome as Home } from 'react-icons/hi2';

import SidebarItem from './SidebarItem';
import Library from './Library';
import ProfilePreview from './ProfilePreview';
import Playlists from './Playlists';
import useToken from '@/hooks/useToken';
import fetchWebApi from '@/utils/fetchWebApi';

interface UserInfoType {
  name: string;
  image?: string;
}

const Sidebar = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const token = useToken();
  const [userInfo, setUserInfo] = useState<UserInfoType>();

  useEffect(() => {
    async function getUserInfo() {
      const res = await fetchWebApi(token, `v1/me`, 'GET');
      const json = await res.json();
      const { display_name, images } = json;
      setUserInfo({
        name: display_name,
        image: images.length !== 0 ? images[0].url : undefined,
      });
    }

    getUserInfo();
  }, [token]);

  const routes = useMemo(
    () => [
      {
        label: 'Home',
        active: pathname === '/',
        href: '/',
        icon: Home,
      },
      {
        label: 'Search',
        active: pathname === '/search',
        href: '/search',
        icon: Search,
      },
    ],
    [pathname]
  );
  return (
    <div className={className}>
      <div className='hidden md:flex flex-col gap-10 p-6 bg-neutral-900 h-full w-[300px]'>
        {userInfo && (
          <ProfilePreview avatar={userInfo.image} name={userInfo.name} />
        )}

        <div>
          <nav className='flex flex-col gap-6'>
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </nav>
        </div>
        <div>
          <Library />
        </div>
        <div className='flex-1 min-h-0'>
          <Playlists />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
