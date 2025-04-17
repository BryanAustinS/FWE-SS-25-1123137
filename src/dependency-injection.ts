import { App } from './app';
import { ENV } from './config/env.config';
import { Database, db } from './database';
import { Server } from './server';

export const DI = {} as {
    app: App;
    db: Database;
    server: Server;
};

export function initializeDI() {
    DI.app = new App();
    DI.db = db;
    DI.server = new Server(DI.app, ENV);
}


