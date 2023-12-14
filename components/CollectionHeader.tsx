import Image from 'next/image';
import H1 from './H1';
import useWindowDimensions from '@/hooks/useWindowDimensions';

const CollectionHeader = ({
  name,
  owner,
  isPlaylist,
  image,
}: {
  name: string;
  owner: string;
  isPlaylist: boolean;
  image: string;
}) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <div className='flex flex-col md:flex-row items-center md:items-end gap-3 md:gap-8 mb-6 max-w-full'>
      <Image
        src={image}
        alt=''
        width={isMobile ? 216 : 240}
        height={isMobile ? 216 : 240}
        className='aspect-square object-cover'
        priority
      />
      <div className='self-start md:self-end flex flex-col md:gap-2 min-w-0'>
        <p className='hidden md:block text-neutral-400 uppercase text-sm'>
          {isPlaylist ? 'Playlist' : 'Album'}
        </p>
        <H1 className='text-xl text-ellipsis overflow-hidden leading-tight'>
          {name}
        </H1>
        <p className='text-sm md:font-medium'>{owner}</p>
      </div>
    </div>
  );
};

export default CollectionHeader;
