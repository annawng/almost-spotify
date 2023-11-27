import { twMerge } from 'tailwind-merge';

import PlaybackControls from './PlaybackControls';
import SecondaryControls from './SecondaryControls';
import CurrentlyPlaying from './CurrentlyPlaying';

const PlaybackBar = ({
  isPlaying,
  currentTrack,
  position,
  togglePlay,
  previousTrack,
  nextTrack,
  className,
}: {
  isPlaying: boolean;
  currentTrack: any;
  position: number;
  togglePlay: () => void;
  previousTrack: () => void;
  nextTrack: () => void;
  className?: string;
}) => {
  return (
    <section
      className={twMerge('flex justify-between items-center p-6', className)}
    >
      <div className='w-[30%]'>
        {currentTrack && <CurrentlyPlaying currentTrack={currentTrack} />}
      </div>
      <div className='flex flex-col items-center gap-1 w-[40%] max-w-[722px]'>
        <PlaybackControls
          isPlaying={isPlaying}
          disabled={!currentTrack}
          position={position}
          duration={currentTrack && currentTrack.duration_ms}
          togglePlay={togglePlay}
          previousTrack={previousTrack}
          nextTrack={nextTrack}
        />
      </div>
      <div className='w-[30%] flex items-center gap-4 justify-end'>
        <SecondaryControls />
      </div>
    </section>
  );
};

export default PlaybackBar;
