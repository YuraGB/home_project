// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { Water } from "three-stdlib";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      salt: string;
      hash: string;
      email: string;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    id: number;
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
    id: number;
  }
}

declare module "three" {
  export { Water };
}
