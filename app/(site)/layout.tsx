import { getServerSession } from 'next-auth/next';

import SessionProvider from '@/providers/SessionProvider';
import { authOptions } from '@/utils/authOptions';
import Sidebar from '@/components/Sidebar';
import WebPlayback from '@/components/WebPlayback';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <SessionProvider session={session}>
      <div className='grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] h-screen'>
        <Sidebar className='flex min-h-0' />
        <WebPlayback>{children}</WebPlayback>
      </div>
    </SessionProvider>
  );
}
