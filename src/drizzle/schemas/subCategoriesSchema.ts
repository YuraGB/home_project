import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { categorySchema } from "@/drizzle/schemas/categorySchema";
import { relations } from "drizzle-orm/relations";

export const subCategoriesSchema = pgTable("sub_categories", {
  id: serial("id").primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 512 }).notNull(),
  categoryId: integer().references(() => categorySchema.id),
});

export const subCategoryRelations = relations(
  subCategoriesSchema,
  ({ one }) => ({
    category: one(categorySchema, {
      fields: [subCategoriesSchema.categoryId],
      references: [categorySchema.id],
    }),
  }),
);
