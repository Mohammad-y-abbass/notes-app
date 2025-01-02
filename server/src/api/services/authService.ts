import { User } from 'types/user';
import { hashPassword } from '@utils/auth';
import { prisma } from '@database/prismaClient';

export async function signupService(user: User) {
  const { username, email, password } = user;

  const hashedPassword = await hashPassword(password);

  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return newUser;
}
