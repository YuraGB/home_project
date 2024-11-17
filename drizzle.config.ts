import "@/drizzle/envConfig";
import { defineConfig } from "drizzle-kit";

console.log(process.env);
export default defineConfig({
  schema: "./src/drizzle/schemas/*",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL,
  },
});
