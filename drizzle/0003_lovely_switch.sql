ALTER TABLE "users" ADD COLUMN "apikey" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_apikey_unique" UNIQUE("apikey");