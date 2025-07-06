import "@/db/drizzle/envConfig";
import { defineConfig } from "drizzle-kit";

console.log(process.env.POSTGRES_LOCAL_URL, process.env.NODE_ENV);
export default defineConfig({
  schema: "./src/db/drizzle/schemas/*",
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env.NODE_ENV !== "production"
        ? process.env.POSTGRES_LOCAL_URL!
        : process.env.POSTGRES_URL!,
  },
});
