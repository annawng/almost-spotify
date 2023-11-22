'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Login from '@/components/Login';
import useToken from '@/hooks/useToken';

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
        <>
          <Header>Welcome</Header>
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
