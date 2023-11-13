import './globals.css';
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import Sidebar from './components/Sidebar';
import { twMerge } from 'tailwind-merge';

const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Music Player',
  description: 'Digital music service',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={twMerge(`flex`, font.className)}>
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
