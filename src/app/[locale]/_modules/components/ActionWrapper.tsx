import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]";
import { AddCategoryBtn } from "@/app/[locale]/_modules/components/AddCategoryBtn";
import React from "react";

export const ActionWrapper = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) return null;

  return <AddCategoryBtn userId={userId} />;
};
