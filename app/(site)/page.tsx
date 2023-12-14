'use client';

import Homepage from '@/components/Homepage';

import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Home = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [router]);

  if (status === 'unauthenticated') {
    redirect('/login');
  }

  return <Homepage />;
};

export default Home;
