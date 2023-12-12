import Image from 'next/image';
import Link from 'next/link';
import { RiPlayFill as Play } from 'react-icons/ri';

import { useDeviceId } from '@/contexts/DeviceContext';
import useToken from '@/hooks/useToken';
import fetchWebApi from '@/utils/fetchWebApi';
import formatTime from '@/utils/formatTime';

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
          ? 'grid-cols-[0.5fr_12fr_8fr_2fr]'
          : index
          ? 'grid-cols-[0.5fr_12fr_2fr]'
          : 'grid-cols-[12fr_8fr_2fr]'
      } grid-flow-row items-center gap-4 hover:bg-neutral-800 text-neutral-400 hover:text-white transition px-4 py-2 rounded-md [&>*]:min-w-full group`}
    >
      {index && (
        <div>
          <p className='text-center group-hover:hidden'>{index}</p>
          <Play
            size={24}
            title={`Play ${name} by ${artist}`}
            className='text-white m-auto hidden group-hover:block cursor-pointer'
            onClick={playTrack}
          />
        </div>
      )}
      <div className='flex gap-6 items-center min-w-0'>
        {image && (
          <div className={`relative ${!index && 'group-hover:cursor-pointer'}`}>
            <Image
              src={image}
              alt={name}
              width={48}
              height={48}
              className={`min-w-[48] ${
                !index && 'group-hover:brightness-50 transition'
              }`}
            />

            {!index && (
              <Play
                size={24}
                title={`Play ${name} by ${artist}`}
                className='text-white m-auto hidden group-hover:block absolute top-1/2 left-0 right-0 translate-y-[-50%]'
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
      {album && (
        <Link
          className='truncate hover:underline cursor-pointer text-sm'
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
