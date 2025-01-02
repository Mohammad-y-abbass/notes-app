import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function main() {
  // ... you will write your Prisma Client queries here
  console.log('connected to postgres using prisma...');
}

export { prisma };
