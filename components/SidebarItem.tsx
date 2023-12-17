import Link from 'next/link';
import { FC } from 'react';
import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

interface SidebarItemProps {
  icon: IconType;
  label: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  href,
  active,
  onClick,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400`,
        active && 'text-white'
      )}
      onClick={onClick}
    >
      <Icon size={24} />
      <p className='truncate w-full'>{label}</p>
    </Link>
  );
};

export default SidebarItem;
