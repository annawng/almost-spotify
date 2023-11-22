export default function getArtists(artists: []) {
  return artists.map((artist: { name: string }) => artist.name).join(', ');
}
