# Almost Spotify
Almost Spotify is a responsive Spotify clone built with Next.js, TypeScript, and Tailwind CSS. It uses NextAuth for authentication, the Spotify API to fetch data about tracks, albums, playlists, and the currrent user, and the Spotify Web Playback SDK to control playback in the application. Users are required to log in with a Spotify Premium account.

Supported features:
- Browsing liked songs, recently played, saved albums, and playlists (each limited to 50)
- Searching for tracks, playlists, and albums
- Playing tracks from albums, playlists, or search results
- Controlling playback (play/pause, skip forward/back, toggle shuffle/loop, adjust volume)

Not supported:
- Liking tracks
- Saving albums
- Creating or saving playlists
- Searching for users or artists
- Viewing user or artist profiles
- Displaying queue (API endpoint doesn't return the correct queue)
- Anything relating to podcasts

Because this application is in [development mode](https://developer.spotify.com/documentation/web-api/concepts/quota-modes) and would require all users to be added to an allowlist, it is not deployed publicly.

## Setup

### Installation
```
# Clone the repository
git clone https://github.com/annawng/almost-spotify.git

# Install dependencies
npm install
```

### Environment Variables
1. Log into the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) using your Spotify account.
2. [Create an app](https://developer.spotify.com/documentation/web-api/concepts/apps) and locate the Client ID and Client Secret.
4. At the root of the project, create a file named `.env.local`.
5. Add the two values to the file as shown below.
```
CLIENT_ID=<your-client-id>
CLIENT_SECRET=<your-client-secret>
```
6. Generate a secure random string with the following command. This will be your NextAuth.js secret.
```
openssl rand -base64 32
```
7. Add this value to `.env.local` as shown below.
```
NEXTAUTH_SECRET=<your-random-string>
```

### Usage
```
# Start the development server
npm run dev
```

## Demo

### Login
![almost-spotify-login](https://github.com/annawng/almost-spotify/assets/25410985/6c533798-73ac-4e38-9dc1-252f19e4834f)

### Home
![almost-spotify-home](https://github.com/annawng/almost-spotify/assets/25410985/0d25c9c3-db03-4cb3-9d99-2bc1736fc669)

### Search & Playback Controls
![almost-spotify-search](https://github.com/annawng/almost-spotify/assets/25410985/a67d09b5-ec46-4f86-bb17-97527b693592)

### Library
![almost-spotify-library](https://github.com/annawng/almost-spotify/assets/25410985/664949ba-e186-42a8-8b75-ed473c9e2439)

### Playlists
![almost-spotify-playlists](https://github.com/annawng/almost-spotify/assets/25410985/46c15511-6bd5-4be6-a86c-27bc0abe62e5)

### Responsive Design
![almost-spotify-responsive](https://github.com/annawng/almost-spotify/assets/25410985/784e8049-7f01-49a1-94b4-fe6c3d22ff10)
