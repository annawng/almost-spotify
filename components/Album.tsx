import Image from 'next/image';

export interface AlbumType {
  id: string;
  name: string;
  artist: string;
  image: string;
}

const Album = ({ album }: { album: AlbumType }) => {
  const { id, name, artist, image } = album;
  return (
    <div className='flex flex-col gap-4 max-w-[200px]'>
      <Image src={image} alt={name} width={200} height={200} />
      <div>
        <h3 className='font-medium text-truncate'>{name}</h3>
        <p className='text-neutral-400 text-truncate'>{artist}</p>
      </div>
    </div>
  );
};

export default Album;
