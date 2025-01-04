import express, { Express, NextFunction, Request, Response } from 'express';
import { main, prisma } from '@database/prismaClient';
import logger from '@utils/logger';
import dotenv from 'dotenv';
import authRoutes from '@routes/authRoute';
import AppError from 'errorHandlers/AppError';
import limiter from '@middlewares/rate-limiter';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(limiter);

const PORT = process.env.PORT || 9001;

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  logger.info(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      logger.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
});

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
