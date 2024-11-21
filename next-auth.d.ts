// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      salt: string;
      hash: string;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    id: string;
    salt: string;
    hash: string;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: string;
    password: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string;
    id: string;
  }
}
