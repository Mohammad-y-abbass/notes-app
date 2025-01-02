import { prisma } from '@database/prismaClient';
import bcrypt from 'bcrypt';
export async function doesUserExist(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}
