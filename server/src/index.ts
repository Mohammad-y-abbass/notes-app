import express, { Express, Request, Response } from 'express';
import { main, prisma } from '@database/prismaClient';
import logger from '@utils/logger';
import dotenv from 'dotenv';
import authRoutes from '@routes/authRoute';

dotenv.config();

const app: Express = express();

app.use(express.json());

const PORT = process.env.PORT || 9001;

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  logger.info(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      logger.info(e);
      await prisma.$disconnect();
      process.exit(1);
    });
});
