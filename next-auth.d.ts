// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultJWT } from "next-auth/jwt";
import { Water } from "three-stdlib";

declare module "next-auth" {
  interface DefaultSession {
    user: {
      id: number;
      salt: string;
      hash: string;
      email: string;
      apikey?: string | null; // Optional field for API key
    };
  }

  interface Session {
    user: {
      id: number;
      salt: string;
      hash: string;
      email: string;
      apikey?: string | null; // Optional field for API key
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    id: number;
    salt: string;
    hash: string;
    apikey?: string | null; // Optional field for API key
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: string;
    password: string;
    apikey?: string | null; // Optional field for API key
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string;
    id: number;
    apikey?: string | null; // Optional field for API key
  }
}

declare module "three" {
  export { Water };
}
