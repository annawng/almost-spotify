export default async function fetchWebApi(
  token: string,
  endpoint: string,
  method: string,
  body?: object
) {
  const res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body),
  });
  return await res;
}
