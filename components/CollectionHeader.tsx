import Image from 'next/image';
import H1 from './H1';
import useWindowDimensions from '@/hooks/useWindowDimensions';

const CollectionHeader = ({
  name,
  owner,
  ownerImage,
  isPlaylist,
  image,
}: {
  name: string;
  owner: string;
  ownerImage: string;
  isPlaylist: boolean;
  image: string;
}) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 640;

  return (
    <div className='flex flex-col sm:flex-row items-center sm:items-end gap-6 sm:gap-8 mb-6 max-w-full'>
      <Image
        src={image}
        alt=''
        width={240}
        height={240}
        className='aspect-square object-cover'
        priority
      />
      <div className='self-start sm:self-end flex flex-col gap-1 sm:gap-2 min-w-0'>
        <p className='hidden sm:block text-neutral-400 uppercase text-sm'>
          {isPlaylist ? 'Playlist' : 'Album'}
        </p>
        <H1 className='text-xl sm:text-4xl text-ellipsis overflow-hidden leading-tight'>
          {name}
        </H1>
        <div className='flex gap-2 items-center'>
          <Image
            src={ownerImage}
            alt=''
            width={isMobile ? 16 : 24}
            height={isMobile ? 16 : 24}
            className='rounded-full'
            priority
          ></Image>
          <p className='text-sm sm:font-medium'>{owner}</p>
        </div>
      </div>
    </div>
  );
};

export default CollectionHeader;
