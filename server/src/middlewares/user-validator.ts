import { body } from 'express-validator';
export const validateSignup = () => {
  return [
    body('email').isEmail().withMessage('Invalid email format'),

    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
      .matches(/\d/)
      .withMessage('Password must contain a number')
      .matches(/[a-zA-Z]/)
      .withMessage('Password must contain a letter'),

    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 3 })
      .withMessage('Name must be at least 3 characters long'),
  ];
};

export const validateLogin = () => {
  return [
    body('email').isEmail().withMessage('Invalid email format'),

    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
      .matches(/\d/)
      .withMessage('Password must contain a number')
      .matches(/[a-zA-Z]/)
      .withMessage('Password must contain a letter'),
  ];
};
