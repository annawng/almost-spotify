'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Albums from '../components/Albums';
import Header from '../components/Header';
import Login from '../components/Login';
import DashboardLayout from '../components/DashboardLayout';
import useToken from '../hooks/useToken';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = useToken();

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  return (
    <>
      {isLoggedIn ? (
        <DashboardLayout className='h-full flex-1 overflow-y-auto p-6'>
          <Header>Welcome</Header>
          <Albums />
        </DashboardLayout>
      ) : (
        <Login />
      )}
    </>
  );
}
