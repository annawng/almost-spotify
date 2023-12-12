import { useEffect, useState } from 'react';

import useToken from '@/hooks/useToken';
import fetchWebApi from '@/utils/fetchWebApi';
import getArtists from '@/utils/getArtists';
import AlbumPreview from './AlbumPreview';
import { CollectionType } from './Preview';

const Recommended = () => {
  const token = useToken();
  const [topArtistIds, setTopArtistIds] = useState<String[]>();
  const [recommendations, setRecommendations] = useState<CollectionType[]>();

  useEffect(() => {
    async function getTopArtistIds() {
      const res = await fetchWebApi(token, 'me/top/artists?limit=5', 'GET');
      const json = await res.json();
      const ids = json.items.map((artist: any) => artist.id);
      setTopArtistIds(ids);
    }

    if (!topArtistIds) {
      getTopArtistIds();
    }
  }, [token, topArtistIds]);

  useEffect(() => {
    async function getRecommendations() {
      const res = await fetchWebApi(
        token,
        `recommendations?seed_artists=${topArtistIds!.join()}&limit=5`,
        'GET'
      );
      const json = await res.json();
      const albums = json.tracks.map((item: any) => {
        const { album } = item;
        const { id, name, artists, images } = album;
        return {
          id: id,
          name: name,
          by: getArtists(artists),
          image: images[0].url,
        };
      });
      setRecommendations(albums);
    }

    if (topArtistIds && !recommendations) {
      getRecommendations();
    }
  }, [token, topArtistIds, recommendations]);

  return (
    <>
      {recommendations && (
        <section>
          <h2 className='font-medium text-2xl mb-6'>Recommended albums</h2>
          <ul className='max-w-full grid grid-cols-5 grid-flow-row gap-8'>
            {recommendations.map((recommendation: CollectionType, index) => (
              <li key={index}>
                <AlbumPreview album={recommendation} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
};

export default Recommended;
