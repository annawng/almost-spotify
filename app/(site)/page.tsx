'use client';

import Header from '@/components/Header';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Home = () => {
  const { status } = useSession();

  if (status === 'unauthenticated') {
    redirect('/login');
  }

  return <Header>Welcome</Header>;
};

export default Home;
