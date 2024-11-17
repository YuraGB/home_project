import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { categorySchema } from "@/drizzle/schemas/categorySchema";
import { subCategoriesSchema } from "@/drizzle/schemas/subCategoriesSchema";
import { relations } from "drizzle-orm/relations";

export const postsSchema = pgTable("posts", {
  id: serial("id").primaryKey(),
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
