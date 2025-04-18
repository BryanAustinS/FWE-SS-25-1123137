import { Database } from '../index';
import { destination } from '../schema/destination.schema';

export class DestinationRepository {
    constructor (private readonly database: Database) {}

}

