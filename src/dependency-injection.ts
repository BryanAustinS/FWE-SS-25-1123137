import { App } from './app';
import { ENV } from './config/env.config';
import {
  Database,
  db,
} from './database';
import { Routes } from './routes/routes';
import { Server } from './server';
import { TripRepository } from './database/repository/trip.repository';
import { DestinationRepository } from './database/repository/destination.repository';
import { TripController } from './controller/trip.controller';
//import { DestinationController } from './controller/destination.controller';

export const DI = {} as {
  app: App;
  db: Database;
  server: Server;
  routes: Routes;
  repositories: {
    trip: TripRepository;
    destination: DestinationRepository;
  };
  controller: {
    trip: TripController;
    // destination: DestinationController;
  };
};

export function initializeDI() {
  // Initialize Database
  DI.db = db;

  // Initialize Repositories
  DI.repositories = {
    trip: new TripRepository(DI.db),
    destination:
      new DestinationRepository(DI.db),
  };

  // Initialize Controller
  DI.controller = {
    trip: new TripController(
      DI.repositories.trip
    ),
  };

  // Initialize Routes
  DI.routes = new Routes(
    DI.controller.trip
  );

  // Initialize App
  DI.app = new App(DI.routes);
  DI.server = new Server(DI.app, ENV);
}
