import './globals.css';
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import { twMerge } from 'tailwind-merge';
import Provider from '@/components/Provider';
import { getServerSession } from 'next-auth/next';
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
        <Provider session={session}>
          <Sidebar className='flex min-h-0' />
          <main className='h-full overflow-y-scroll p-6'>{children}</main>
          <WebPlayback>{children}</WebPlayback>
        </Provider>
      </body>
    </html>
  );
}
