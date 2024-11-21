import NextAuth, { type NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "@/server/actions/user/getUserByEmail";
import { validPassword } from "@/lib/crypto";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Full name" },
        email: { label: "Username", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },

      async authorize(credentials): Promise<User | null> {
        const { id, email, password } = credentials;

        // sign in after registration
        if (id && !password && email) {
          try {
            return await getUserByEmail(email);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (e) {
            throw new Error("Oops we couldn't sign you in");
          }
        }
        // sign in after login
        if (password && email) {
          try {
            const user = await getUserByEmail(email);

            const { salt, hash } = user;

            const validation = validPassword(password, hash, salt);

            if (validation) {
              return user;
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (e) {
            throw new Error("Oops we couldn't sign you in");
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
};

export default NextAuth(authOptions);
