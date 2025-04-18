import { Database } from '../index';
import { trip } from '../schema/trip.schema';
import { eq } from 'drizzle-orm';

export class TripRepository {
  constructor(
    private readonly database: Database
  ) {}

  async createTrip(
    data: typeof trip.$inferInsert
  ) {
    return await this.database
      .insert(trip)
      .values(data)
      .returning();
  }

  async getAllTrip() {
    return await this.database
      .select()
      .from(trip);
  }

  async getTripById(id: string) {
    return await this.database
      .select()
      .from(trip)
      .where(eq(trip.id, id));
  }

  async getTripByName(name: string) {
    return await this.database
      .select()
      .from(trip)
      .where(eq(trip.name, name));
  }

  async getTripByDestination() {}

  async getTripByDate() {}

  async updateTrip(
    id: string,
    data: Partial<
      typeof trip.$inferInsert
    >
  ) {
    return await this.database
      .update(trip)
      .set(data)
      .where(eq(trip.id, id))
      .returning();
  }

  async deleteTrip(id: string) {
    return await this.database
      .delete(trip)
      .where(eq(trip.id, id))
      .returning();
  }
}
