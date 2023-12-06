import Collection from '@/components/Collection';

const LikedSongs = () => {
  return <Collection endpoint='me/tracks' isPlaylist isLikedSongs />;
};

export default LikedSongs;
