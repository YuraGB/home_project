import "@/db/drizzle/envConfig";
import { defineConfig } from "drizzle-kit";

console.log("process.env", process.env);
export default defineConfig({
  schema: "./src/db/drizzle/schemas/*",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL,
    connectionString: process.env.POSTGRES_URL,
  },
});
