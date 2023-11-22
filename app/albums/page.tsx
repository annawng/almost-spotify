import Albums from '@/components/Albums';

const AlbumsPage = () => {
  return (
    <>
      <h1 className='font-bold text-5xl mb-12'>Saved albums</h1>
      <div className='max-w-full grid grid-cols-5 grid-flow-row gap-2'>
        <Albums />
      </div>
    </>
  );
};

export default AlbumsPage;
