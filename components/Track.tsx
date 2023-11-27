import { useDeviceId } from '@/contexts/DeviceContext';
import useToken from '@/hooks/useToken';
import fetchWebApi from '@/utils/fetchWebApi';
import formatTime from '@/utils/formatTime';
import Image from 'next/image';

export interface TrackType {
  uri: string;
  name: string;
  artist: string;
  album?: string;
  image?: string;
  duration_ms: number;
  context_uri?: string;
}

const Track = ({ track, index }: { track: TrackType; index?: number }) => {
  const token = useToken();
  const deviceId = useDeviceId();

  const { uri, name, artist, album, image, duration_ms, context_uri } = track;
  const duration = formatTime(duration_ms);

  async function playTrack() {
    await fetchWebApi(token, `v1/me/player/play?device_id=${deviceId}`, 'PUT', {
      context_uri: context_uri,
      offset: { uri: uri },
    });
  }

  return (
    <div
      onClick={playTrack}
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
