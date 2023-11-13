import Albums from '../components/Albums';
import Header from '../components/Header';
import Login from '../components/Login';

export default function Home() {
  return (
    <main className='h-full flex-1 overflow-y-auto'>
      <Login />
      <Header>Welcome</Header>
      <Albums />
    </main>
  );
}
