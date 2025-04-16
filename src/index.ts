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

app.listen(ENV.PORT, () => {
  console.log(
    `Server is running on port ${ENV.PORT}`
  );
});
