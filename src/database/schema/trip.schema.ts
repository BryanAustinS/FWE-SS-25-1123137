import { integer, date, text, pgTable, varchar } from 'drizzle-orm/pg-core';
import { commonSchema } from './common.schema';

export const trip = pgTable('trip', {
    ...commonSchema,
    name: varchar({length: 256}).notNull(),
    description: text(),
    startDate: date().notNull(),
    endDate: date().notNull(),
    participants: text().notNull(),
    imageUrl: text(),
});