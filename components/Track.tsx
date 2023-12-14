import Image from 'next/image';
import Link from 'next/link';
import { RiPlayFill as Play } from 'react-icons/ri';

import { useDeviceId } from '@/contexts/DeviceContext';
import useToken from '@/hooks/useToken';
import fetchWebApi from '@/utils/fetchWebApi';
import formatTime from '@/utils/formatTime';
import useWindowDimensions from '@/hooks/useWindowDimensions';

export interface TrackType {
  uri: string;
  name: string;
  artist: string;
  album?: string;
  album_id?: string;
  image?: string;
  duration_ms: number;
  context_uri?: string;
}

const Track = ({ track, index }: { track: TrackType; index?: number }) => {
  const token = useToken();
  const deviceId = useDeviceId();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const {
    uri,
    name,
    artist,
    album,
    album_id,
    image,
    duration_ms,
    context_uri,
  } = track;
  const duration = formatTime(duration_ms);

  async function playTrack() {
    await fetchWebApi(token, `me/player/play?device_id=${deviceId}`, 'PUT', {
      ...(context_uri
        ? { context_uri, offset: { uri: uri } }
        : { uris: [uri] }),
    });
  }

  return (
    <div
      className={`grid ${
        album && index
          ? 'grid-cols-[12fr_2fr] md:grid-cols-[0.5fr_12fr_8fr_2fr]'
          : index
          ? 'grid-cols-[12fr_2fr] md:grid-cols-[0.5fr_12fr_2fr]'
          : 'grid-cols-[12fr_2fr] md:grid-cols-[12fr_8fr_2fr]'
      } grid-flow-row items-center gap-4 md:hover:bg-neutral-800 text-neutral-400 md:hover:text-white transition md:px-4 py-2 rounded-md group cursor-pointer md:cursor-default w-full`}
      onClick={isMobile ? playTrack : undefined}
    >
      {index && !isMobile && (
        <div className='w-6'>
          <p className='hidden text-center md:inline md:group-hover:hidden'>
            {index}
          </p>
          <Play
            size={24}
            title={`Play ${name} by ${artist}`}
            className='text-white m-auto hidden md:group-hover:block cursor-pointer'
            onClick={playTrack}
          />
        </div>
      )}
      <div className='flex gap-4 items-center min-w-0'>
        {image && (
          <div
            className={`relative shrink-0 ${
              !index && 'md:group-hover:cursor-pointer'
            }`}
          >
            <Image
              src={image}
              alt={name}
              width={48}
              height={48}
              className={`min-w-[48] ${
                !index && 'md:group-hover:brightness-50 transition'
              }`}
            />

            {!index && (
              <Play
                size={24}
                title={`Play ${name} by ${artist}`}
                className='text-white m-auto hidden md:group-hover:block absolute top-1/2 left-0 right-0 translate-y-[-50%]'
                onClick={playTrack}
              />
            )}
          </div>
        )}

        <div className='min-w-0'>
          <p className='truncate font-medium text-white'>{name}</p>
          <p className='truncate text-sm'>{artist}</p>
        </div>
      </div>
      {album && !isMobile && (
        <Link
          className='truncate md:hover:underline cursor-pointer text-sm'
          href={`/album/${album_id}`}
        >
          {album}
        </Link>
      )}
      <p className='text-right text-neutral-400 text-sm'>{duration}</p>
    </div>
  );
};

export default Track;
