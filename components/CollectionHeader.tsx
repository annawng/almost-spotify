import Image from 'next/image';

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
      />
      <div className='flex flex-col gap-2 min-w-0'>
        <p className='text-neutral-400 uppercase text-sm'>
          {isPlaylist ? 'Playlist' : 'Album'}
        </p>
        <h1 className='font-bold text-5xl text-ellipsis overflow-hidden leading-tight'>
          {name}
        </h1>
        <p className='font-medium'>{owner}</p>
      </div>
    </div>
  );
};

export default CollectionHeader;
