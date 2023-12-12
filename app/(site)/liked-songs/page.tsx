import Collection from '@/components/Collection';

const LikedSongs = () => {
  return <Collection endpoint='me/tracks?limit=50' isPlaylist isLikedSongs />;
};

export default LikedSongs;
