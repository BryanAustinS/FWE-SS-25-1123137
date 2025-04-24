ALTER TABLE "destination" ALTER COLUMN "activities" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "destination" ALTER COLUMN "activities" SET DEFAULT '[]';