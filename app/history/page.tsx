import Collection from '@/components/Collection';

const History = () => {
  return (
    <>
      <h1 className='font-bold text-5xl mb-12'>Recently played</h1>
      <Collection
        endpoint={`me/player/recently-played`}
        isPlaylist
        showHeader={false}
      />
    </>
  );
};

export default History;
