import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { categoryTable } from "@/db/drizzle/schemas/categorySchema";
import { relations } from "drizzle-orm/relations";
import { postsSchema } from "@/db/drizzle/schemas/postsSchema";
import { usersTable } from "@/db/drizzle/schemas/userSchema";

export const subCategoriesSchema = pgTable("sub_categories", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 512 }).notNull(),
  image: varchar(),
  userId: integer().references(() => usersTable.id),
  categoryId: integer().references(() => categoryTable.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  layoutSchema: varchar().default("default"),
});

export const subCategoryRelations = relations(
  subCategoriesSchema,
  ({ one, many }) => ({
    category: one(categoryTable, {
      fields: [subCategoriesSchema.categoryId],
      references: [categoryTable.id],
    }),
    user: one(usersTable, {
      fields: [subCategoriesSchema.userId],
      references: [usersTable.id],
    }),
    posts: many(postsSchema),
  }),
);

export type TSubCategory = typeof subCategoriesSchema.$inferSelect;
