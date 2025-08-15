import {
  drizzle as drizzleVercel,
  VercelPgDatabase,
} from 'drizzle-orm/vercel-postgres';
import {
  drizzle as drizzleNodePostgres,
  NodePgDatabase,
} from 'drizzle-orm/node-postgres';
import { Pool } from 'pg'; // Required for node-postgres client
import 'dotenv/config';

type Database =
  | VercelPgDatabase<Record<string, unknown>>
  | NodePgDatabase<Record<string, unknown>>;

let db: Database;

if (process.env.NODE_ENV === 'production') {
  // Use Vercel(Neon) Postgres drizzle in production
  db = drizzleVercel();
} else {
  // Use Node Postgres drizzle in development
  const connectionString = process.env.POSTGRES_LOCAL_URL;
  if (!connectionString) {
    throw new Error('POSTGRES_LOCAL_URL is not defined.');
  }
  const pool = new Pool({ connectionString });
  db = drizzleNodePostgres(pool);
}

export { db };
