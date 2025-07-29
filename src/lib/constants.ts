export const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_URL || "https://home-project-jet.vercel.app/"
    : process.env.NEXT_DEV_URL || "https://localhost:3000/";
