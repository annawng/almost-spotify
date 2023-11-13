import { useSession } from 'next-auth/react';

const useToken = () => {
  const session: any = useSession();
  return session?.user?.accessToken;
};

export default useToken;
