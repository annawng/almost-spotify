import Collection from '@/components/Collection';

const PlaylistPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return <Collection id={id} isPlaylist={true} />;
};

export default PlaylistPage;
