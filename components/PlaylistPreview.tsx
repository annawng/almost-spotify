import Preview, { CollectionType } from './Preview';

const PlaylistPreview = ({ playlist }: { playlist: CollectionType }) => {
  return <Preview collection={playlist} type='playlist' />;
};

export default PlaylistPreview;
