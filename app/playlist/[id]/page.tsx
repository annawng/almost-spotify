import Playlist from '@/components/Playlist';

const PlaylistPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return <Playlist id={id} />;
};

export default PlaylistPage;
