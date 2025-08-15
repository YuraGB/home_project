import NextAuth, { type NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserByEmail } from '@/server/services/user/getUserByEmail';
import { validPassword } from '@/server/lib/crypto';
import logger from '@/server/lib/logger';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        id: { type: 'text' },
        username: { label: 'Username', type: 'text', placeholder: 'Full name' },
        email: { label: 'E-mail', type: 'text', placeholder: 'email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'password',
        },
      },

      async authorize(credentials): Promise<User | null> {
        if (!credentials) return null;
        let user = null;
        let isValid = false;

        const { email, password } = credentials;

        // sign in after registration
        if (!password && email && credentials.id) {
          try {
            user = await getUserByEmail(email);
            if (!user) {
              logger.error(`User not found. Email: ${email}`);
              throw new Error('The user is not found');
            }
            return { ...user, id: user.id, apikey: user.apikey ?? null };
          } catch (e) {
            logger.error((e as Error).stack);
            throw new Error("Oops we couldn't sign you in");
          }
        }
        // sign in after login
        if (password && email) {
          try {
            user = await getUserByEmail(email);
            if (user) {
              const { salt, hash } = user;

              isValid = validPassword(password, hash, salt);
            }
          } catch (e) {
            logger.error((e as Error).stack);
            throw new Error("Oops we couldn't sign you in");
          }
        }

        if (!user) {
          logger.error(`User not found. Email: ${email}`);
          throw new Error('The user is not found');
        }

        if (isValid) {
          return { ...user, id: user.id, apikey: user.apikey ?? null };
        }

        throw new Error('The password is not correct');
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async jwt({ token, user }) {
      // під час логіну user є
      if (user) {
        token.id = Number(user.id);
        token.apikey = user.apikey; // важливо зберегти тут
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as number;
        session.user.apikey = token.apikey as string | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
};

export default NextAuth(authOptions);
