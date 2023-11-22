'use client';

import { signIn } from 'next-auth/react';

const Login = () => {
  return <button onClick={() => signIn('spotify')}>Login</button>;
};

export default Login;
