import { pgTable, integer, varchar } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";
import { relations } from "drizzle-orm/relations";
import { postsSchema } from "@/db/drizzle/schemas/postsSchema";

export const resourceTable = pgTable("resource", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  url: varchar().notNull(),
  postId: integer().notNull(),
});

export const resourceRelations = relations(resourceTable, ({ one }) => ({
  posts: one(postsSchema, {
    fields: [resourceTable.postId],
    references: [postsSchema.id],
  }),
}));

export type TPostResources = InferSelectModel<typeof resourceTable>;
