import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]";
import React from "react";
import { AddCategoryBtn } from "./AddCategoryBtn";

export const ActionWrapper = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) return null;

  return <AddCategoryBtn userId={userId} />;
};
