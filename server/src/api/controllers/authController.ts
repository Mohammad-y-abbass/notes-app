import { signupService } from '@services/authService';
import { loginUserService } from '@services/authService';
import { compareHashedPassword, createToken, doesUserExist } from '@utils/auth';
import AppError from 'errorHandlers/AppError';
import { Request, Response, NextFunction } from 'express';
import {
  FailedToCreateUserError,
  PasswordDontMatchError,
  UserExistsError,
} from 'errorHandlers/user-error';
import { ValidationsError } from 'errorHandlers/validation-error';
import { validationResult } from 'express-validator';
import { NoDataError } from 'errorHandlers/not-found-error';

export async function signupController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    next(new ValidationsError('validation error', errors));
  }

  try {
    const existingUser = await doesUserExist(user.email);

    if (existingUser) {
      return next(new UserExistsError());
    }

    const newUser = await signupService(user);

    if (!newUser) {
      return next(new FailedToCreateUserError());
    }

    res
      .status(201)
      .json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    next(new AppError('Error on the server', 500));
  }
}

export async function loginUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, email, password } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(new ValidationsError('validation error', errors));
    }
    const user = await loginUserService(email);
    if (!user) {
      return next(new NoDataError());
    }

    const isMatch = await compareHashedPassword(password, user.password);
    if (!isMatch) {
      return next(new PasswordDontMatchError());
    }

    const token = createToken(user.id, process.env.TOKEN_SECRET as string);

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    next(error);
  }
}
