import Collection from '@/components/Collection';
import H1 from '@/components/H1';

const History = () => {
  return (
    <>
      <H1>Recently played</H1>
      <Collection
        endpoint={`me/player/recently-played?limit=50`}
        isPlaylist
        showHeader={false}
        showIndex={false}
      />
    </>
  );
};

export default History;
