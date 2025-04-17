import {
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const commonSchema = {
  id: uuid('id')
    .primaryKey()
    .defaultRandom(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
};
