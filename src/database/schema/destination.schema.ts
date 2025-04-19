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
    startDate: text().notNull(),
    endDate: date().notNull(),
    activities: text(),
  }
);
