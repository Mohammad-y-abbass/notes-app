import { User } from 'types/user';
import { compareHashedPassword, hashPassword } from '@utils/auth';
import { createUser, findUser } from '@database/queries/userQueries';

export async function signupService(user: User) {
  const { username, email, password } = user;

  const hashedPassword = await hashPassword(password);

  const newUser = await createUser(username, email, hashedPassword);

  return newUser;
}

export async function loginUserService(email: string) {
  const doesUserExisit = await findUser(email);

  return doesUserExisit;
}
