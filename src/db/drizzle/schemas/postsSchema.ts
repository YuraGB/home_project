import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { categorySchema } from "@/db/drizzle/schemas/categorySchema";
import { subCategoriesSchema } from "@/db/drizzle/schemas/subCategoriesSchema";
import { relations } from "drizzle-orm/relations";

export const postsSchema = pgTable("posts", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  value: varchar().notNull(),
  categoryId: integer().references(() => categorySchema.id),
  subCategoryId: integer().references(() => subCategoriesSchema.id),
});

export const postsRelations = relations(postsSchema, ({ one }) => ({
  categories: one(categorySchema, {
    fields: [postsSchema.categoryId],
    references: [categorySchema.id],
  }),
  subCategories: one(subCategoriesSchema, {
    fields: [postsSchema.subCategoryId],
    references: [subCategoriesSchema.id],
  }),
}));
