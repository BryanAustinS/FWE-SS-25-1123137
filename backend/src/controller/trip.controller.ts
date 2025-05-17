import {
  Request,
  Response,
} from 'express';
import * as TripRepository from '../database/repository/trip.repository';
import { UnsplashService } from '../unsplash.service';
import {
  createTripSchema,
  updateTripSchema,
} from '../validation/validation';

export class TripController {
  constructor(
    private readonly tripRepository: TripRepository.TripRepository,
    private readonly unsplashService: UnsplashService
  ) {}

  create = async (
    req: Request,
    res: Response
  ) => {
    try {
      const tripData = req.body;

      if (
        !tripData.imageUrl &&
        tripData.name
      ) {
        tripData.imageUrl =
          await this.unsplashService.getTripImage(
            tripData.name
          );
      }

      const validatedData =
        createTripSchema.parse(
          tripData
        );

      const result =
        await this.tripRepository.createTrip(
          validatedData
        );
      return res
        .status(201)
        .json(result);
    } catch (error: unknown) {
      console.error(
        'Error creating trip:',
        error
      );
      return res.status(500).json({
        error: 'Failed to create trip',
        details:
          error instanceof Error
            ? error.message
            : 'Unknown error occurred',
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
    } catch (error: unknown) {
      console.error(
        'Error fetching trips:',
        error
      );
      return res.status(500).json({
        error:
          'Failed to fetch all trips',
        details:
          error instanceof Error
            ? error.message
            : 'Unknown error occurred',
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
      if (result.length === 0) {
        return res.status(404).json({
          error: 'Trip not found',
          details: `No trip exists with id: ${id}`,
        });
      }
      return res
        .status(200)
        .json(result);
    } catch (error: unknown) {
      console.error(
        'Error fetching trip by id: ',
        error
      );
      return res.status(500).json({
        error:
          'Failed to fetch trip by id',
        details:
          error instanceof Error
            ? error.message
            : 'Unknown error occurred',
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
        return res.status(400).json({
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
    } catch (error: unknown) {
      console.error(
        'Error fetching trip by name:',
        error
      );
      return res.status(500).json({
        error:
          'Failed to fetch trip by name',
        details:
          error instanceof Error
            ? error.message
            : 'Unknown error occurred',
      });
    }
  };

  getTripByNameContains = async (
    req: Request,
    res: Response
  ) => {
    try {
      const name =
        req.params.namecontains;

      if (
        !name ||
        typeof name !== 'string'
      ) {
        return res.status(400).json({
          error:
            'Invalid name parameter',
        });
      }

      const result =
        await this.tripRepository.getTripByNameContains(
          name
        );

      return res
        .status(200)
        .json(result);
    } catch (error: unknown) {
      console.error(
        'Error fetching trip by name:',
        error
      );
      return res.status(500).json({
        error:
          'Failed to fetch trip by name',
        details:
          error instanceof Error
            ? error.message
            : 'Unknown error occurred',
      });
    }
  };

  getByDate = async (
    req: Request,
    res: Response
  ) => {
    try {
      const date = req.params.date;

      if (
        !date ||
        typeof date !== 'string'
      ) {
        return res.status(400).json({
          error:
            'Invalid date parameter',
        });
      }

      const dateRegex =
        /^\d{4}-\d{2}-\d{2}$/;
      if (
        !dateRegex.test(date) ||
        isNaN(Date.parse(date))
      ) {
        return res.status(400).json({
          error: 'Invalid date format',
          details:
            'Date must be in YYYY-MM-DD format',
        });
      }

      const result =
        await this.tripRepository.getTripByDate(
          date
        );
      return res
        .status(200)
        .json(result);
    } catch (error: unknown) {
      console.error(
        'Error fetching trip by name:',
        error
      );
      return res.status(500).json({
        error:
          'Failed to fetch trip by name',
        details:
          error instanceof Error
            ? error.message
            : 'Unknown error occurred',
      });
    }
  };

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
      if (trip.length === 0) {
        return res.status(404).json({
          error: 'Trip not found',
          details: `No trip exists with id: ${id}`,
        });
      }

      if (
        !tripData.imageUrl &&
        tripData.name
      ) {
        tripData.imageUrl =
          await this.unsplashService.getTripImage(
            tripData.name
          );
      }

      const validatedData =
        updateTripSchema.parse(
          tripData
        );

      const result =
        await this.tripRepository.updateTrip(
          id,
          validatedData
        );
      return res
        .status(200)
        .json(result);
    } catch (error: unknown) {
      console.error(
        'Error updating trip:',
        error
      );
      return res.status(500).json({
        error: 'Failed to update trip',
        details:
          error instanceof Error
            ? error.message
            : 'Unknown error occurred',
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
      if (trip.length === 0) {
        return res.status(404).json({
          error: 'Trip not found',
          details: `No trip exists with id: ${id}`,
        });
      }

      const result =
        await this.tripRepository.deleteTrip(
          id
        );
      return res
        .status(200)
        .json(result);
    } catch (error: unknown) {
      console.error(
        'Error deleting trip: ',
        error
      );
      return res.status(500).json({
        error: 'Failed to delete trip',
        details:
          error instanceof Error
            ? error.message
            : 'Unknown error occurred',
      });
    }
  };
}
