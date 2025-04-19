import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url().min(1),
  PORT: z.coerce
    .number()
    .int()
    .positive()
    .default(3000),
  UNSPLASH_ACCESS_KEY: z.string().min(1),
  UNSPLASH_SECRET_KEY: z.string().min(1),
});

export const ENV = envSchema.parse(
  process.env
);
export type EnvType = typeof ENV;
