import Collection from '@/components/Collection';

const AlbumPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return <Collection id={id} isPlaylist={false} />;
};

export default AlbumPage;
