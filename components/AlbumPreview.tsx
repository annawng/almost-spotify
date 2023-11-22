import Image from 'next/image';
import Link from 'next/link';

export interface AlbumType {
  id: string;
  name: string;
  artist: string;
  image: string;
}

const AlbumPreview = ({ album }: { album: AlbumType }) => {
  const { id, name, artist, image } = album;
  return (
    <Link
      href={`/album/${id}`}
      className='flex flex-col gap-4 max-w-[200px] hover:bg-neutral-800 transition p-4 rounded-md cursor-pointer'
    >
      <Image
        src={image}
        alt={name}
        width={200}
        height={200}
        className='aspect-square object-cover'
      />
      <div>
        <h3 className='font-medium truncate'>{name}</h3>
        <p className='text-neutral-400 truncate'>{artist}</p>
      </div>
    </Link>
  );
};

export default AlbumPreview;
