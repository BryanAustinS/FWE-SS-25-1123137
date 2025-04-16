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
