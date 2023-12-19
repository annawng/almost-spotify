import { AuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import SpotifyProvider from 'next-auth/providers/spotify';

export const authOptions: AuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      authorization: `https://accounts.spotify.com/authorize?scope=${encodeURIComponent(
        'user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played playlist-read-private user-read-private user-read-email user-top-read user-library-read streaming'
      )}`,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at * 1000,
          user,
        };
      }
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }
      const newToken = await refreshAccessToken(token);
      return newToken;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.error = token.error;
      session.user = token.user;
      return session;
    },
  },
};

async function refreshAccessToken(token: JWT) {
  try {
    const res = await fetch(
      `https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=${
        token.refreshToken
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
