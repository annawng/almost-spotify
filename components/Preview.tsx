import Image from 'next/image';
import Link from 'next/link';

export interface CollectionType {
  id: string;
  name: string;
  by: string;
  image: string;
}

const Preview = ({
  collection,
  type,
}: {
  collection: CollectionType;
  type: string;
}) => {
  const { id, name, by, image } = collection;
  return (
    <Link
      href={`/${type}/${id}`}
      className='flex flex-col gap-4 max-w-[200px] bg-white/[0.025] hover:bg-neutral-800 transition duration-300 p-5 rounded-md cursor-pointer'
    >
      <Image
        src={image}
        alt={name}
        width={200}
        height={200}
        className='aspect-square object-cover box-shadow'
      />
      <div>
        <p className='font-bold truncate'>{name}</p>
        <p className='text-neutral-400 truncate'>{by}</p>
      </div>
    </Link>
  );
};

export default Preview;
