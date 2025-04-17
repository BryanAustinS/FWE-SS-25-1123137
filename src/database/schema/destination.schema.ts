import {
  integer,
  date,
  text,
  pgTable,
  varchar,
} from 'drizzle-orm/pg-core';
import { commonSchema } from './common.schema';

export const destination = pgTable(
  'destination',
  {
    ...commonSchema,
    name: varchar({
      length: 256,
    }).notNull(),
    description: text(),
    startDate: text().notNull(),
    endDate: date().notNull(),
    imageUrl: text(),
    activities: text(),
  }
);
