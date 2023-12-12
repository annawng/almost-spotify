'use client';

import Homepage from '@/components/Homepage';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Home = () => {
  const { status } = useSession();

  if (status === 'unauthenticated') {
    redirect('/login');
  }

  return <Homepage />;
};

export default Home;
