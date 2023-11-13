'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const Albums = () => {
  const session: any = useSession();

  const [token, setToken] = useState(null);

  // name, email, picture, sub

  useEffect(() => {
    async function fetchWebApi(
      endpoint: string,
      method: string,
      body?: object
    ) {
      const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method,
        body: JSON.stringify(body),
      });
      const json = await res.json();
      console.log(json);
      return json;
    }
    async function getNewReleases() {
      return await fetchWebApi('v1/browse/new-releases', 'GET');
    }

    if (session.data) {
      setToken(session.data.user.accessToken);

      getNewReleases();
    }
  }, [token, session.data]);

  return <div>Albums</div>;
};

export default Albums;
