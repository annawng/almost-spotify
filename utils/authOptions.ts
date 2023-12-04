import { AuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import SpotifyProvider from 'next-auth/providers/spotify';

export const authOptions: AuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      authorization: `https://accounts.spotify.com/authorize?scope=${encodeURIComponent(
        'user-read-email user-read-private user-read-recently-played user-read-playback-state playlist-read-private user-library-read user-library-modify streaming'
      )}`,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token }) {
      const currentTime = new Date();
      // on initial login, token.expiresAt will be undefined
      const expiresAt = new Date(
        token.expiresAt ? (token.expiresAt as number) : 0
      );

      if (currentTime < expiresAt) {
        return token;
      }

      // access token has expired, try to update it
      const newToken = await refreshAccessToken(token);
      return newToken;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};

async function refreshAccessToken(token: JWT) {
  try {
    const res = await fetch(
      `https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=${
        process.env.REFRESH_TOKEN
      }&client_id=${process.env.CLIENT_ID!}&client_secret=${process.env
        .CLIENT_SECRET!}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const refreshedToken = await res.json();

    if (!res.ok) {
      throw refreshedToken;
    }

    return {
      ...token,
      expiresAt: Date.now() + refreshedToken.expires_in * 1000,
      accessToken: refreshedToken.access_token,
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
