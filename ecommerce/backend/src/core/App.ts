import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { Logger } from './Logger';
import { Router } from './Router';
import { errorHandler } from '../middleware/errorHandler';

export class App {
  public expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.configureMiddleware();
    this.configureRoutes();
    this.configureErrorHandling();
  }

  private configureMiddleware(): void {
    Logger.info('Initializing application middleware pipeline...');
    this.expressApp.use(helmet());
    this.expressApp.use(cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Session-ID']
    }));
    this.expressApp.use(express.json({ limit: '10mb' }));
    this.expressApp.use(express.urlencoded({ extended: true, limit: '10mb' }));
    this.expressApp.use(morgan('combined', {
      stream: {
        write: (message: string) => Logger.info(message.trim())
      }
    }));
  }

  private configureRoutes(): void {
    Logger.info('Registering API endpoints...');
    const apiRouter = express.Router();

    // Health check endpoint
    apiRouter.get('/health', (req: Request, res: Response) => {
      res.status(200).json({
        status: 'ok',
        appName: 'NexusCart Enterprise Platform',
        timestamp: new Date().toISOString(),
        uptimeSeconds: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
      });
    });

    Router.mount(apiRouter);
    this.expressApp.use('/api/v1', apiRouter);
  }

  private configureErrorHandling(): void {
    this.expressApp.use(errorHandler);
  }

  public listen(port: number, callback?: () => void): void {
    this.expressApp.listen(port, () => {
      Logger.info(`NexusCart Enterprise Application listening on 0.0.0.0:${port}`);
      if (callback) callback();
    });
  }
}
