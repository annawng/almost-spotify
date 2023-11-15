import './globals.css';
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import Sidebar from './components/Sidebar';
import { twMerge } from 'tailwind-merge';
import Provider from './components/Provider';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './utils/authOptions';

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
      <body className={twMerge(`flex`, font.className)}>
        <Provider session={session}>
          <Sidebar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
