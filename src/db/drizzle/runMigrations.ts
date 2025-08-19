import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as dotenv from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, "../../../.env") });
console.log("Connecting to:", process.env.POSTGRES_LOCAL_URL);

const pool = new Pool({
  connectionString: process.env.POSTGRES_LOCAL_URL,
});

const db = drizzle(pool);

(async () => {
  try {
    console.log("⏳ Running migrations...");
    await migrate(db, {
      migrationsFolder: resolve(__dirname, "../../../drizzle"),
    });
    console.log("✅ Migrations complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
})();
