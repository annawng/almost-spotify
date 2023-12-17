import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { HiOutlineSearch as Search } from 'react-icons/hi';
import { HiOutlineHome as Home } from 'react-icons/hi2';

import ProfilePreview from './ProfilePreview';
import SidebarItem from './SidebarItem';
import Library from './Library';
import Playlists from './Playlists';
import fetchWebApi from '@/utils/fetchWebApi';
import useToken from '@/hooks/useToken';

interface UserInfoType {
  name: string;
  image?: string;
}

const Nav = ({ onClick }: { onClick?: () => void }) => {
  const pathname = usePathname();
  const token = useToken();
  const [userInfo, setUserInfo] = useState<UserInfoType>();

  useEffect(() => {
    async function getUserInfo() {
      const res = await fetchWebApi(token, 'me', 'GET');
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
    <>
      {userInfo && (
        <ProfilePreview avatar={userInfo.image} name={userInfo.name} />
      )}

      <nav className='flex flex-col gap-6'>
        {routes.map((item) => (
          <SidebarItem key={item.label} onClick={onClick} {...item} />
        ))}
      </nav>
      <div>
        <Library onClick={onClick} />
      </div>
      <div className='flex-1 min-h-0'>
        <Playlists onClick={onClick} />
      </div>
    </>
  );
};

export default Nav;
