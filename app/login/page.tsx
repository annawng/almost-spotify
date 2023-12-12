'use client';

import { signIn } from 'next-auth/react';

const Login = () => {
  return (
    <main className='flex flex-col items-center gap-4 h-full justify-center text-center bg-white/[0.015] px-8'>
      <h1 className='font-bold text-5xl'>Almost Spotify</h1>
      <p className='max-w-sm mb-4 text-neutral-400'>
        It&apos;s like Spotify but with less features. Also, you need an account
        with Spotify Premium. Enjoy!
      </p>
      <button
        onClick={() => {
          signIn('spotify', { callbackUrl: '/' });
        }}
        className='border border-green-800 px-4 py-2 rounded-full w-fit hover:bg-green-800 transition duration-200'
      >
        Log in with Spotify
      </button>
    </main>
  );
};

export default Login;
