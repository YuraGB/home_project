import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]";

export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);
  return session?.user ?? null;
};
