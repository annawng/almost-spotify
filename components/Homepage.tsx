import TopTracks from './TopTracks';
import RecentlyPlayed from './RecentlyPlayed';
import Recommended from './Recommended';
import Header from './Header';

const Homepage = () => {
  return (
    <div className='flex flex-col gap-8'>
      <Header />
      <RecentlyPlayed />
      <TopTracks />
      <Recommended />
    </div>
  );
};

export default Homepage;
