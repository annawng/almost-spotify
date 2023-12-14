import Image from 'next/image';
import H1 from './H1';

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
  return (
    <div className='flex items-end gap-8 mb-6 max-w-full'>
      <Image
        src={image}
        alt=''
        width={240}
        height={240}
        className='aspect-square object-cover'
        priority
      />
      <div className='flex flex-col gap-2 min-w-0'>
        <p className='text-neutral-400 uppercase text-sm'>
          {isPlaylist ? 'Playlist' : 'Album'}
        </p>
        <H1 className='text-ellipsis overflow-hidden leading-tight'>{name}</H1>
        <p className='font-medium'>{owner}</p>
      </div>
    </div>
  );
};

export default CollectionHeader;
