CREATE TABLE IF NOT EXISTS "destination" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"name" varchar(256) NOT NULL,
	"description" text,
	"start_date" text NOT NULL,
	"end_date" date NOT NULL,
	"image_url" text,
	"activities" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trip" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"name" varchar(256) NOT NULL,
	"description" text,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"participants" text NOT NULL,
	"image_url" text
);
