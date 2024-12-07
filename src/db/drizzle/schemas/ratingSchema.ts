import { integer, pgTable, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";
import { postsSchema } from "@/db/drizzle/schemas/postsSchema";
import { relations } from "drizzle-orm/relations";

export const ratingTable = pgTable("rating", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  votes: integer().default(0),
  amountRating: integer().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  postId: integer()
    .notNull()
    .references(() => postsSchema.id),
});

export const ratingRelations = relations(ratingTable, ({ one }) => ({
  categories: one(postsSchema, {
    fields: [ratingTable.postId],
    references: [postsSchema.id],
  }),
}));

export type TRatingSchema = InferSelectModel<typeof ratingTable>;
