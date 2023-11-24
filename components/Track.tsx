import Image from 'next/image';

export interface TrackType {
  id: string;
  name: string;
  artist: string;
  album?: string;
  image?: string;
  duration_ms: number;
}

const Track = ({ track, index }: { track: TrackType; index?: number }) => {
  let { id, name, artist, album, image, duration_ms } = track;
  const d = new Date(duration_ms);
  const duration = `${d.getMinutes()}:${String(d.getSeconds()).padStart(
    2,
    '0'
  )}`;

  console.log(index);

  return (
    <div
      className={`grid ${
        album && index
          ? 'grid-cols-[0.5fr_12fr_8fr_2fr]'
          : index
          ? 'grid-cols-[0.5fr_12fr_2fr]'
          : 'grid-cols-[12fr_8fr_2fr]'
      } grid-flow-row items-center gap-4 hover:bg-neutral-800 transition px-4 py-2 rounded-md [&>*]:min-w-full`}
    >
      {index && <p className='text-center text-neutral-400'>{index}</p>}
      <div className='flex gap-6 items-center min-w-0'>
        {image && (
          <Image
            src={image}
            alt={name}
            width={48}
            height={48}
            className='min-w-[48]'
          />
        )}
        <div className='min-w-0'>
          <p className='truncate font-medium'>{name}</p>
          <p className='truncate text-neutral-400 text-sm'>{artist}</p>
        </div>
      </div>
      {album && <p className='truncate text-neutral-400'>{album}</p>}
      <p className='text-right text-neutral-400'>{duration}</p>
    </div>
  );
};

export default Track;
