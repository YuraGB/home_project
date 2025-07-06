import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "@/db/drizzle/schemas/userSchema";
import { relations } from "drizzle-orm/relations";
import { postsSchema } from "@/db/drizzle/schemas/postsSchema";

export const categoryTable = pgTable("categories", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  image: varchar(),
  description: varchar({ length: 512 }).notNull(),
  userId: integer().references(() => usersTable.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  layoutSchema: varchar().default("default"),
});

export const categoryRelations = relations(categoryTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [categoryTable.userId],
    references: [usersTable.id],
  }),
  posts: many(postsSchema),
}));

export type TCategory = typeof categoryTable.$inferSelect;
