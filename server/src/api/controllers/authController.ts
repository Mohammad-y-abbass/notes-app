import { signupService } from '@services/authService';
import { doesUserExist } from '@utils/auth';
import { Request, Response } from 'express';

export async function signupController(req: Request, res: Response) {
  const user = req.body;

  try {
    const existingUser = await doesUserExist(user.email);

    if (existingUser) {
      // Send response and end function, no need for `return`
      res.status(400).json({ message: 'User already exists' });
      return; // Early return after response
    }

    const newUser = await signupService(user);

    if (!newUser) {
      // Send response and end function, no need for `return`
      res.status(400).json({ message: 'Failed to create user' });
      return; // Early return after response
    }

    // Successful user creation response
    res
      .status(201)
      .json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    // Catch any unexpected errors and send response
    res.status(500).json({ message: 'Internal server error', error: error });
  }
}
