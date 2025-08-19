import { db } from "@/db";
import { usersTable } from "@/db/drizzle/schemas/userSchema";
import { eq } from "drizzle-orm";

export const getUserApiKey = async (email: string) => {
  try {
    const [apikey] = await db
      .select({ field1: usersTable.apikey })
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .execute();

    return apikey ? apikey : null;
  } catch (error) {
    console.error("Error fetching API key:", error);
    return null;
  }
};
