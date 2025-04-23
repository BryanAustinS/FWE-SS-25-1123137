ALTER TABLE "trip" ALTER COLUMN "participants" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "destination" DROP COLUMN IF EXISTS "description";--> statement-breakpoint
ALTER TABLE "destination" DROP COLUMN IF EXISTS "image_url";