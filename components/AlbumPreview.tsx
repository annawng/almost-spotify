import Preview, { CollectionType } from './Preview';

const AlbumPreview = ({ album }: { album: CollectionType }) => {
  return <Preview collection={album} type='album' />;
};

export default AlbumPreview;
