import { Router } from 'express';
import { TripController } from '../controller/trip.controller'


export class Routes {
    private router: Router;

    constructor(
        private readonly tripController: TripController,
    ) {
        this.router = Router();
        this.initializeRoutes;
    }

    private initializeRoutes() {

    }

    public getRouter() {
        return this.router;
    }
}