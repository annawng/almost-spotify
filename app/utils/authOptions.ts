import { AuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import SpotifyProvider from 'next-auth/providers/spotify';

export const authOptions: AuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id = account.id;
        token.expiresAt = account.expires_at;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }

      if (account?.expires_at && Date.now() < account.expires_at) {
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
