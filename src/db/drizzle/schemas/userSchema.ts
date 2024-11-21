import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  salt: varchar({ length: 255 }).notNull(),
  hash: varchar({ length: 255 }).notNull(),
});

export type TUserSchema = InferSelectModel<typeof usersTable>;
