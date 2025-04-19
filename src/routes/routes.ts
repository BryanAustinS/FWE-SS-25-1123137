import { Router } from 'express';
import { TripController } from '../controller/trip.controller';
import { DestinationController } from '../controller/destination.controller';

export class Routes {
  private router: Router;

  constructor(
    private readonly tripController: TripController,
    private readonly destinationController: DestinationController
  ) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Trip Routes
    // Create
    this.router.post(
      '/trip',
      (req, res) => {
        this.tripController.create(
          req,
          res
        );
      }
    );

    // Read
    this.router.get(
      '/trip',
      (req, res) => {
        this.tripController.getAll(
          req,
          res
        );
      }
    );

    this.router.get(
      '/trip/name/:name',
      (req, res) => {
        this.tripController.getByName(
          req,
          res
        );
      }
    );

    //TODO: getByDestination

    this.router.get(
      '/trip/date/:date',
      (req, res) => {
        this.tripController.getByDate(
          req,
          res
        );
      }
    );

    this.router.get(
      '/trip/:id',
      (req, res) => {
        this.tripController.getId(
          req,
          res
        );
      }
    );

    // Update
    this.router.put(
      '/trip/:id',
      (req, res) => {
        this.tripController.update(
          req,
          res
        );
      }
    );

    // Delete
    this.router.delete(
      '/trip/:id',
      (req, res) => {
        this.tripController.delete(
          req,
          res
        );
      }
    );

    // Destination Routes
    // Create
    this.router.post(
      '/destination',
      (req, res) => {
        this.destinationController.create(
          req,
          res
        );
      }
    );

    // Read
    this.router.get(
      '/destination',
      (req, res) => {
        this.destinationController.getAll(
          req,
          res
        );
      }
    );

    this.router.get(
      '/destination/name/:name',
      (req, res) => {
        this.destinationController.getName(
          req,
          res
        );
      }
    );

    this.router.get(
      '/destination/namecontains/:namecontains',
      (req, res) => {
        this.destinationController.getNameContains(
          req,
          res
        );
      }
    );

    this.router.get(
      '/destination/:id',
      (req, res) => {
        this.destinationController.getId(
          req,
          res
        );
      }
    );

    // Update
    this.router.put(
      '/destination/:id',
      (req, res) => {
        this.destinationController.update(
          req,
          res
        );
      }
    );

    // Delete
    this.router.delete(
      '/destination/:id',
      (req, res) => {
        this.destinationController.delete(
          req,
          res
        );
      }
    );
  }

  public getRouter() {
    return this.router;
  }
}
