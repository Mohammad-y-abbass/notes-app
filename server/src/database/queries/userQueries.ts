import { prisma } from '@database/prismaClient';
import { User } from 'types/user';

export const createUser = async (
  username: string,
  email: string,
  hashedPassword: string
) => {
  return await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
};

export const findUser = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};
