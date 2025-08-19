import {
  pgTable,
  serial,
  integer,
  jsonb,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel, relations } from "drizzle-orm";
import { usersTable } from "./userSchema";

export const pushSubscriptions = pgTable(
  "push_subscriptions",
  {
    id: serial("id").primaryKey(),
    userId: integer().references(() => usersTable.id),
    subscription: jsonb("subscription").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    userUnique: uniqueIndex("push_subscriptions_user_id_unique").on(
      table.userId,
    ),
  }),
);

export const pushSubscriptionsRelations = relations(
  pushSubscriptions,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [pushSubscriptions.userId],
      references: [usersTable.id],
    }),
  }),
);

// Типи для зручності
export type PushSubscription = InferSelectModel<typeof pushSubscriptions>;
export type NewPushSubscription = InferInsertModel<typeof pushSubscriptions>;
