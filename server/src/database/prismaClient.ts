import { PrismaClient } from '@prisma/client';
import logger from '@utils/logger';

const prisma = new PrismaClient();

export async function main() {
  // ... you will write your Prisma Client queries here
  logger.info('connected to postgres using prisma...');
}

export { prisma };
