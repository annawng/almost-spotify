import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProfilePreviewProps {
  avatar: string;
  name: string;
}

const ProfilePreview: FC<ProfilePreviewProps> = ({ avatar, name }) => {
  return (
    <div className='flex items-center gap-4'>
      <Image
        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
          name
        )}&size=48`}
        width='48'
        height='48'
        alt=''
        className='rounded-full shrink-0'
      />

      <div className='flex flex-col gap-0'>
        <p>{name}</p>
        <Link
          href='/profile'
          className='text-sm cursor-pointer hover:text-white transition text-neutral-400'
        >
          View profile
        </Link>
      </div>
    </div>
  );
};

export default ProfilePreview;
