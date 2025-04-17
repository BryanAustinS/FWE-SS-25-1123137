import { defineConfig } from 'drizzle-kit';
import { ENV } from './env.config';

export default defineConfig({
  dialect: 'postgresql',
  out: './drizzle',
  casing: 'snake_case',
  schema: './src/database/schema',
  dbCredentials: {
    url: ENV.DATABASE_URL,
  },
  migrations: {
    table: 'migrations',
  },
});
