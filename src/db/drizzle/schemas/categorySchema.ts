import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "@/db/drizzle/schemas/userSchema";
import { relations } from "drizzle-orm/relations";

export const categorySchema = pgTable("categories", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 512 }).notNull(),
  userId: integer().references(() => usersTable.id),
});

export const categoryRelations = relations(categorySchema, ({ one }) => ({
  user: one(usersTable, {
    fields: [categorySchema.userId],
    references: [usersTable.id],
  }),
}));
