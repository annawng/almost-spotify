import Collection from '@/components/Collection';

const PlaylistPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return <Collection endpoint={`playlists/${id}?limit=50`} isPlaylist />;
};

export default PlaylistPage;
