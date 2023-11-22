import Collection from '@/components/Collection';

const AlbumPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return <Collection endpoint={`albums/${id}`} />;
};

export default AlbumPage;
