import { Router } from 'express';
import { TripController } from '../controller/trip.controller';

export class Routes {
    private router: Router;

    constructor(
        private readonly tripController: TripController,
    ) {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // Create
        this.router.post('/trip', (req, res) => {
            this.tripController.create(req, res);
        });

        // Read
        this.router.get('/trip', (req, res) => {
            this.tripController.getAll(req, res);
        });

        this.router.get('/trip/:id', (req, res) => {
            this.tripController.getId(req, res);
        });

        this.router.get('/trip/search/name', (req, res) => {
            this.tripController.getByName(req, res);
        });

        //TODO: getByDestination 

        this.router.get('/trip/search/date', (req, res) => {
            this.tripController.getByDate(req, res);
        });

        // Update
        this.router.put('/trip/:id', (req, res) => {
            this.tripController.update(req, res);
        });

        // Delete
        this.router.put('/trip/:id', (req, res) => {
            this.tripController.delete(req, res);
        });
    }

    public getRouter() {
        return this.router;
    }
}