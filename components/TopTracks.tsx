'use client';

import { useState } from 'react';

import Collection from './Collection';

const TopTracks = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section>
      {isLoaded && (
        <h2 className='font-semibold text-2xl mb-5'>Your top tracks</h2>
      )}
      <Collection
        endpoint={`me/top/tracks?limit=5`}
        isPlaylist
        showHeader={false}
        setIsLoaded={() => setIsLoaded(true)}
      />
    </section>
  );
};

export default TopTracks;
