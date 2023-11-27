'use client';
import { SessionProvider as _SessionProvider } from 'next-auth/react';

export default function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return <_SessionProvider session={session}>{children}</_SessionProvider>;
}
