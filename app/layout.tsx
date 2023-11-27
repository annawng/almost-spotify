import './globals.css';
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import { getServerSession } from 'next-auth/next';
import { twMerge } from 'tailwind-merge';

import SessionProvider from '@/providers/SessionProvider';
import { authOptions } from '@/utils/authOptions';
import Sidebar from '@/components/Sidebar';
import WebPlayback from '@/components/WebPlayback';

const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Music Player',
  description: 'Digital music service',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang='en'>
      <body
        className={twMerge(
          `grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] max-h-screen`,
          font.className
        )}
      >
        <SessionProvider session={session}>
          <Sidebar className='flex min-h-0' />
          <WebPlayback>{children}</WebPlayback>
        </SessionProvider>
      </body>
    </html>
  );
}
