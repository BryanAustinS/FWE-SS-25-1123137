import {
  Request,
  Response,
} from 'express';
import * as DestinationRepository from '../database/repository/destination.repository';

export class DestinationController {
  constructor(
    private readonly destinationRepository: DestinationRepository.DestinationRepository
  ) {}

  create = async (
    req: Request,
    res: Response
  ) => {
    try {
      const destinationData = req.body;
      const result =
        await this.destinationRepository.createDestination(
          destinationData
        );
      return res
        .status(201)
        .json(result);
    } catch (error: any) {
      console.error(
        'Error creating destination:',
        error
      );
      return res
        .status(500)
        .json({
          error:
            'Failed to create destination',
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
        await this.destinationRepository.getAllDestination();
      return res
        .status(200)
        .json(result);
    } catch (error: any) {
      console.error(
        'Error fetching destination: ',
        error
      );
      return res
        .status(500)
        .json({
          error:
            'Failed to fetch all destinations',
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
        await this.destinationRepository.getDestinationById(
          id
        );
      return res
        .status(200)
        .json(result);
    } catch (error: any) {
      console.error(
        'Error in fetching destination by id: ',
        error
      );
      return res
        .status(500)
        .json({
          error:
            'Failed to fetch destination by id',
          details: error.message,
        });
    }
  };

  getName = async (
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
        await this.destinationRepository.getDestinationByName(
          name
        );
      return res
        .status(200)
        .json(result);
    } catch (error: any) {
      console.error(
        'Error in fetching destination by name: ',
        error
      );
      return res
        .status(500)
        .json({
          error:
            'Failed to fetch destination by name',
          details: error.message,
        });
    }
  };

  getNameContains = async (
    req: Request,
    res: Response
  ) => {
    try {
      const name = req.params.namecontains;

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
        await this.destinationRepository.getDestinationByNameContains(
          name
        );
      return res
        .status(200)
        .json(result);
    } catch (error: any) {
      console.error(
        'Error in fetching destination containing name: ',
        error
      );
      return res
        .status(500)
        .json({
          error:
            'Failed to fetch destination containing name',
          details: error.message,
        });
    }
  };

  update = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = req.params.id;
      const destinationData = req.body;

      const destination =
        await this.destinationRepository.getDestinationById(
          id
        );
      if (!destination) {
        return res
          .status(404)
          .json({
            error:
              'Destination not found ',
          });
      }

      const result =
        await this.destinationRepository.updateDestination(
          id,
          destinationData
        );
      return res
        .status(200)
        .json(result);
    } catch (error: any) {
      console.error(
        'Error in updating destination: ',
        error
      );
      return res
        .status(500)
        .json({
          error:
            'Failed to update destination',
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
      const result =
        await this.destinationRepository.deleteDestination(
          id
        );
      return res
        .status(200)
        .json(result);
    } catch (error: any) {
      console.error(
        'Error in deleting destination',
        error
      );
      return res
        .status(500)
        .json({
          error:
            'Failed to delete destination',
          details: error.message,
        });
    }
  };
}
