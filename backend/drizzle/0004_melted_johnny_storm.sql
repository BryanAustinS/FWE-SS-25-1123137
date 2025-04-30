ALTER TABLE "trip" ALTER COLUMN "participants" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "destination" ADD COLUMN "nights" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "destination" DROP COLUMN IF EXISTS "start_date";--> statement-breakpoint
ALTER TABLE "destination" DROP COLUMN IF EXISTS "end_date";
ALTER TABLE "destination" ALTER COLUMN "activities" TYPE jsonb USING activities::jsonb;