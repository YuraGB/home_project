if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_URL || "http://home-project-jet.vercel.app/"
    : process.env.NEXT_DEV_URL || "http://localhost:3000/";
