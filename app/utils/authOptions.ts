import { AuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import SpotifyProvider from 'next-auth/providers/spotify';

export const authOptions: AuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      authorization: `https://accounts.spotify.com/authorize?scope=${encodeURIComponent(
        'user-read-email user-read-private user-read-recently-played user-read-playback-state playlist-read-private user-library-read user-library-modify'
      )}`,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token }) {
      const issuedAt = new Date((token.iat as number) * 1000);
      const expiresAt = new Date(issuedAt.getTime() + 60 * 60 * 1000); // should expire after 1 hr
      const currentTime = new Date();

      if (currentTime < expiresAt) {
        return token;
      }

      return refreshAccessToken(token);
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
      expiresAt: refreshedToken.expires_at,
      accessToken: refreshedToken.access_token,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
