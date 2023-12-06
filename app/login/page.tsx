'use client';

import { signIn } from 'next-auth/react';

const Login = () => {
  return (
    <main className='flex flex-col items-center gap-4 h-full justify-center'>
      <h1 className='font-bold text-5xl'>Not Spotify</h1>
      <p className='max-w-sm text-center mb-4'>
        It&apos;s like Spotify but with less features. Also, you need an account
        with Spotify Premium. Enjoy!
      </p>
      <button
        onClick={() => {
          signIn('spotify', { callbackUrl: '/' });
        }}
        className='border border-green-600 px-4 py-2 rounded-full w-fit hover:bg-green-600 transition duration-200'
      >
        Log in with Spotify
      </button>
    </main>
  );
};

export default Login;
