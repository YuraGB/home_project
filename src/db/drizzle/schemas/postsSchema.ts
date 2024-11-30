import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { categorySchema } from "@/db/drizzle/schemas/categorySchema";
import { subCategoriesSchema } from "@/db/drizzle/schemas/subCategoriesSchema";
import { relations } from "drizzle-orm/relations";
import { InferSelectModel } from "drizzle-orm";
import { usersTable } from "@/db/drizzle/schemas/userSchema";

export const postsSchema = pgTable("posts", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  url: varchar().notNull(),
  image: varchar(),
  categoryId: integer().references(() => categorySchema.id),
  subCategoryId: integer().references(() => subCategoriesSchema.id),
  userId: integer().references(() => usersTable.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
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
  users: one(usersTable, {
    fields: [postsSchema.userId],
    references: [usersTable.id],
  }),
}));

export type TDBPost = InferSelectModel<typeof postsSchema>;
