import { useSession } from 'next-auth/react';

const useName = () => {
  const session: any = useSession();
  return session.data?.user?.name;
};

export default useName;
