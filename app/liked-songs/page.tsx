import Collection from '@/components/Collection';

const LikedSongs = () => {
  return (
    <>
      <Collection endpoint='me/tracks' isPlaylist={true} isLikedSongs={true} />
    </>
  );
};

export default LikedSongs;
