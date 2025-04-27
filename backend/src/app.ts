import express, {
  Application,
} from 'express';
import { globalErrorHandler } from './utils/global-error';
import { Routes } from './routes/routes';
import cors from 'cors';

export class App {
  private app: Application;

  constructor(
    private readonly routes: Routes
  ) {
    this.app = express();
    this._registerMiddlewares();
    this._registerErrorHandlers();
    this._registerRoutes();
  }

  private _registerMiddlewares() {
    this.app.use(cors({
      origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], 
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
      allowedHeaders: ['Content-Type', 'Authorization'], 
    }));
    
    this.app.use(express.json());

    this.app.use((req, _res, next) => {
      console.info(
        `New request to ${req.path}`
      );
      next();
    });
  }

  private _registerRoutes() {
    this.app.use(
      '/api',
      this.routes.getRouter()
    );
  }

  private _registerErrorHandlers() {
    this.app.use(globalErrorHandler);
  }

  public listen(
    port: number,
    callback: () => void
  ) {
    return this.app.listen(
      port,
      callback
    );
  }
}
