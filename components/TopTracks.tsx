'use client';

import { useState } from 'react';

import Collection from './Collection';
import H2 from './H2';

const TopTracks = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section>
      {isLoaded && <H2>Your top tracks</H2>}
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
