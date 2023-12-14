import Albums from '@/components/Albums';
import H1 from '@/components/H1';

const AlbumsPage = () => {
  return (
    <>
      <H1 className='mb-6'>Saved albums</H1>
      <ul className='max-w-full grid grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] md:grid-cols-[repeat(auto-fill,_minmax(160px,_1fr))] lg:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] grid-flow-row gap-8'>
        <Albums />
      </ul>
    </>
  );
};

export default AlbumsPage;
