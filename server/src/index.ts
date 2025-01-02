import express, { Express, Request, Response } from 'express';
import { main, prisma } from '@database/prismaClient';
import logger from '@utils/logger';

import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

const PORT = process.env.PORT || 9001;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

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
