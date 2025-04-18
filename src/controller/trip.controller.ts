import {
  Request,
  Response,
} from 'express';
import * as TripRepository from '../database/repository/trip.repository';

export class TripController {
  constructor(
    private readonly tripRepository: TripRepository.TripRepository
  ) {}

  create = async (
    req: Request,
    res: Response
  ) => {
    try {
      const tripData = req.body;
      const result =
        await this.tripRepository.createTrip(
          tripData
        );
      return res
        .status(201)
        .json(result);
    } catch (error: any) {
      console.error(
        'Error creating trip:',
        error
      );
      return res
        .status(500)
        .json({
          error:
            'Failed to create trip',
          details: error.message,
        });
    }
  };

  getAll = async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await this.tripRepository.getAllTrip();
      return res
        .status(200)
        .json(result);
    } catch (error: any) {
      console.error(
        'Error fetching trips:',
        error
      );
      return res
        .status(500)
        .json({
          error:
            'Failed to fetch all trips',
          details: error.message,
        });
    }
  };

  getId = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = req.params.id;

      const result =
        await this.tripRepository.getTripById(
          id
        );
      return res
        .status(200)
        .json(result);
    } catch (error: any) {
      console.error(
        'Error fetching trip by id: ',
        error
      );
      return res
        .status(500)
        .json({
          error:
            'Failed to fetch trip by id',
          details: error.message,
        });
    }
  };

  getByName = async (
    req: Request,
    res: Response
  ) => {
    try {
      const name = req.params.name;

      if (
        !name ||
        typeof name !== 'string'
      ) {
        return res
          .status(400)
          .json({
            error:
              'Invalid name parameter',
          });
      }

      const result =
        await this.tripRepository.getTripByName(
          name
        );
      return res
        .status(200)
        .json(result);
    } catch (error: any) {
      console.error(
        'Error fetching trip by name:',
        error
      );
      return res
        .status(500)
        .json({
          error:
            'Failed to fetch trip by name',
          details: error.message,
        });
    }
  };

  getByDestination = async (
    req: Request,
    res: Response
  ) => {};

  getByDate = async (
    req: Request,
    res: Response
  ) => {};

  update = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = req.params.id;
      const tripData = req.body;

      const trip =
        await this.tripRepository.getTripById(
          id
        );
      if (!trip) {
        return res
          .status(404)
          .json({
            error: 'Trip not found',
          });
      }

      const result =
        await this.tripRepository.updateTrip(
          id,
          tripData
        );
      return res
        .status(200)
        .json(result);
    } catch (error: any) {
      console.error(
        'Error updating trip:',
        error
      );
      return res
        .status(500)
        .json({
          error:
            'Failed to update trip',
          details: error.message,
        });
    }
  };

  delete = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = req.params.id;

      const trip =
        await this.tripRepository.getTripById(
          id
        );
      if (!trip) {
        return res
          .status(404)
          .json({
            error: 'Trip not found',
          });
      }

      const result =
        await this.tripRepository.deleteTrip(
          id
        );
      return res
        .status(200)
        .json(result);
    } catch (error: any) {
      console.error(
        'Error deleting trip: ',
        error
      );
      return res
        .status(500)
        .json({
          error:
            'Failed to delete trip',
          details: error.message,
        });
    }
  };
}
