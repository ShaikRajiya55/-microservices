import { Request, Response, NextFunction } from 'express';
import { AppError } from '../core/Errors';
import { Logger } from '../core/Logger';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  if (err instanceof AppError) {
    Logger.warn(`API Handled Error [${err.statusCode}]: ${err.message}`, { path: req.path, details: err.details });
    res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        statusCode: err.statusCode,
        details: err.details
      }
    });
    return;
  }

  Logger.error('Unhandled System Error:', err, { path: req.path, body: req.body });
  res.status(500).json({
    success: false,
    error: {
      message: 'Internal Server Exception',
      statusCode: 500
    }
  });
}
