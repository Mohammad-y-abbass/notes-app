import express, { Express, Request, Response, NextFunction } from 'express';
import AppError from 'errorHandlers/AppError';
import logger from '@utils/logger';

const app: Express = express();

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  const errorResponse = {
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500,
    },
  };

  logger.error(err);

  res.status(errorResponse.error.status).json(errorResponse);
});
