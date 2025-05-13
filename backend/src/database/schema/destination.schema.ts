import {
  uuid,
  integer,
  pgTable,
  varchar,
  jsonb,
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
    nights: integer().default(0),
    activities: jsonb().default('[]'),
    tripId: uuid('trip_id')
      .notNull()
      .references(() => trip.id, {
        onDelete: 'cascade',
      }),
  }
);
