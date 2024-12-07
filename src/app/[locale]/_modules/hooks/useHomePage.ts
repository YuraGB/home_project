"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]";
import { getCatalogByUserId } from "@/server/actions/catalog/getCatalogByUserId";
import { TCategory } from "@/db/drizzle/schemas/categorySchema";

type TUseHomePage = {
  id: number;
  categories: TCategory[] | null;
};

export const getHomePage = async (): Promise<TUseHomePage | null> => {
  const session = await getServerSession(authOptions);
  if (session?.user?.id) {
    const categories = await getCatalogByUserId(session.user.id);
    return {
      id: session.user.id,
      categories,
    };
  }
  return null;
};
