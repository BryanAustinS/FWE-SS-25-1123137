import {
  createInsertSchema,
  createSelectSchema,
} from 'drizzle-zod';
import { z } from 'zod';
import { destination } from '../database/schema/destination.schema';
import { trip } from '../database/schema/trip.schema';

// Validation for destination
export const createDestinationSchema =
  createInsertSchema(destination, {
    name: z.string().min(1).max(256),
    nights: z.number(),
    activities: z
      .array(z.string())
      .default([])
      .optional(),
    tripId: z.string().uuid(),
  });

export const updateDestinationSchema =
  createInsertSchema(destination, {
    name: z
      .string()
      .min(1)
      .max(256)
      .optional(),
    nights: z
      .number(),
    activities: z
      .array(z.string())
      .optional(),
    tripId: z
      .string()
      .uuid()
      .optional(),
  }).partial();

export const selectDestinationSchema =
  createSelectSchema(destination);

export type InsertDestination = z.infer<
  typeof createDestinationSchema
>;
export type SelectDestination = z.infer<
  typeof selectDestinationSchema
>;
export type UpdateDestination = z.infer<
  typeof updateDestinationSchema
>;

// Validation for trip
export const createTripSchema =
  createInsertSchema(trip, {
    name: z.string().min(1).max(256),
    startDate: z.string().min(1),
    endDate: z.string(),
    description: z.string().optional(),
    participants: z.number(),
    imageUrl: z.string(),
  });

export const updateTripSchema =
  createInsertSchema(trip, {
    name: z
      .string()
      .min(1)
      .max(256)
      .optional(),
    startDate: z
      .string()
      .min(1)
      .optional(),
    endDate: z.string().optional(),
    description: z.string().optional(),
    participants: z.number().optional(),
    imageUrl: z.string().optional(),
  }).partial();

export const selectTripSchema =
  createSelectSchema(trip);

export type InsertTrip = z.infer<
  typeof createTripSchema
>;
export type SelectTrip = z.infer<
  typeof updateTripSchema
>;
export type UpdateTrip = z.infer<
  typeof selectTripSchema
>;
