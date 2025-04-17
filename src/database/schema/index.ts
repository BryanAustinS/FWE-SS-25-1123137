import * as trip from './trip.schema';
import * as destination from './destination.schema';

export const databaseSchema = {
  ...trip,
  ...destination,
};
