import { prisma } from '@database/prismaClient';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

export async function compareHashedPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hashedPassword);

  return isMatch;
}

export function createToken(
  userId: number,
  secret: string,
  expiresIn: string = '1h'
): string {
  const payload = {
    userId,
  };

  const token = jwt.sign(payload, secret, { expiresIn });

  return token;
}
