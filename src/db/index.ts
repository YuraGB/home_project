import { drizzle } from "drizzle-orm/vercel-postgres";
import { drizzle as drizzleLocal } from "drizzle-orm/node-postgres";
import "dotenv/config";

let db;

if (process.env.NODE_ENV === "production") {
  db = drizzle();
} else {
  db = drizzleLocal(process.env.POSTGRES_LOCAL_URL!);
}

export { db };
