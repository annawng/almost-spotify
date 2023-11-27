import Image from 'next/image';

import getArtists from '@/utils/getArtists';

const CurrentlyPlaying = ({ currentTrack }: { currentTrack: any }) => {
  const { album, artists, name } = currentTrack;
  const image = album.images[1].url;
  const artist = getArtists(artists);

  return (
    <div className='flex gap-4'>
      <Image src={image} alt='' width={56} height={56} />
      <div className='flex flex-col justify-center min-w-0'>
        <p className='text-sm font-medium text-white truncate'>{name}</p>
        <p className='text-xs truncate'>{artist}</p>
      </div>
    </div>
  );
};

export default CurrentlyPlaying;
