import { Database } from '../index';
import { destination } from '../schema/destination.schema';
import { eq, ilike } from 'drizzle-orm';

export class DestinationRepository {
    constructor (private readonly database: Database) {}

    async createDestination (data: typeof destination.$inferInsert) {
        return await this.database.insert(destination).values(data).returning();
    }
    
    async getAllDestination() {
        return await this.database.select().from(destination);
    }

    async getDestinationById(id: string){
        return await this.database.select().from(destination).where(eq(destination.id, id));
    }

    async getDestinationByName(name: string){
        return await this.database.select().from(destination).where(eq(destination.name, name));
    }

    async getDestinationByNameContains(name: String){
        return await this.database.select().from(destination).where(ilike(destination.name, `%${name}%`));
    }

    async updateDestination(id: string, data: Partial<typeof destination.$inferInsert>) { 
      return await this.database.update(destination).set(data).where(eq(destination.id, id)).returning();
    }

    async deleteDestination(id: string) {
        return await this.database.delete(destination).where(eq(destination.id, id)).returning();
    }


}

