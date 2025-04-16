import express, {
  Request,
  Response,
} from 'express';

import { ENV } from './config/env.config';

const app = express();

app.get(
  '/',
  (_req: Request, res: Response) => {
    res.send('Hello World!!!');
  }
);

// Error handling
app.use((err: Error, _req: Request, res: Response) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    errors: ['Internal server error'],
  });
});

// Logging
app.use((req, res, next) => {
  console.info(`New request to ${req.path}`);
  next();

  throw new Error('Something went wrong');
});

app.listen(ENV.PORT, () => {
  console.log(
    `Server is running on port ${ENV.PORT}`
  );
});
