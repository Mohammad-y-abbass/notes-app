import express from 'express';
import { loginUserController, signupController } from '@controllers/authController';
import { validateLogin, validateSignup } from '@middlewares/user-validator';

const router = express.Router();

router.post('/signup', validateSignup(), signupController);

router.get('/login',validateLogin() , loginUserController)

export default router;