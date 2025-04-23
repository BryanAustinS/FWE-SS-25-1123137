import {
  uuid,
  date,
  text,
  pgTable,
  varchar,
} from 'drizzle-orm/pg-core';
import { commonSchema } from './common.schema';
import { trip } from './trip.schema';

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
    tripId: uuid('trip_id')
      .notNull()
      .references(() => trip.id, {
        onDelete: 'cascade',
      }),
  }
);
