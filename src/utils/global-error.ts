import { NextFunction, Request, Response } from 'express';

export function globalErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error('Unhandled error:', err);
  res.status(500).json({
    errors: ['Internal server error'],
  });
}