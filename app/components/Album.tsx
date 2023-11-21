import Image from 'next/image';

export interface AlbumType {
  id: string;
  name: string;
  artist: string;
  image: string;
}

const Album = ({ album }: { album: AlbumType }) => {
  const { id, name, artist, image } = album;
  return (
    <div>
      <Image src={image} alt={name} width={300} height={300} />
      <h3>{name}</h3>
      <p>{artist}</p>
    </div>
  );
};

export default Album;
