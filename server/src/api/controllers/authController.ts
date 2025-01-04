import { signupService } from '@services/authService';
import { doesUserExist } from '@utils/auth';
import AppError from 'errorHandlers/AppError';
import { UserExistsError } from 'errorHandlers/user-error';
import { ValidationError } from 'errorHandlers/validation-error';
import { Request, Response, NextFunction } from 'express';

export async function signupController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.body;

  try {
    const existingUser = await doesUserExist(user.email);

    if (existingUser) {
      return next(new UserExistsError());
    }

    const newUser = await signupService(user);

    if (!newUser) {
      return next(new ValidationError());
    }

    res
      .status(201)
      .json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    next(new AppError('Error on the server', 500));
  }
}
