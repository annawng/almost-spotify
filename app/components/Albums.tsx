'use client';

import { useEffect } from 'react';
import useToken from '../hooks/useToken';

const Albums = () => {
  const token = useToken();

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

    getNewReleases();
  }, [token]);

  return <div>Albums</div>;
};

export default Albums;
