import {
  boolean,
  integer,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { categoryTable } from '@/db/drizzle/schemas/categorySchema';
import { subCategoriesSchema } from '@/db/drizzle/schemas/subCategoriesSchema';
import { relations } from 'drizzle-orm/relations';
import { InferSelectModel } from 'drizzle-orm';
import { usersTable } from '@/db/drizzle/schemas/userSchema';
import { resourceTable } from '@/db/drizzle/schemas/postResourses';

export const postsSchema = pgTable('posts', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  url: varchar().notNull(),
  image: varchar(),
  categoryId: integer().references(() => categoryTable.id),
  subCategoryId: integer().references(() => subCategoriesSchema.id),
  userId: integer().references(() => usersTable.id),
  lastVisited: timestamp(),
  hasUpdates: boolean().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const postsRelations = relations(postsSchema, ({ one, many }) => ({
  categories: one(categoryTable, {
    fields: [postsSchema.categoryId],
    references: [categoryTable.id],
  }),
  subCategories: one(subCategoriesSchema, {
    fields: [postsSchema.subCategoryId],
    references: [subCategoriesSchema.id],
  }),
  users: one(usersTable, {
    fields: [postsSchema.userId],
    references: [usersTable.id],
  }),
  relations: many(resourceTable),
}));

export type TDBPost = InferSelectModel<typeof postsSchema>;
