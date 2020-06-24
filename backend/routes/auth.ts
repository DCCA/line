import express from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/auth';
import User from '../models/user';

const router = express.Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Use a valid email'),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Use a password with more then 5 characters'),
  ],
  authController.postLogin
);

router.post(
  '/sign-up',
  [
    body('email')
      .isEmail()
      .withMessage('Use a valid email')
      .custom(async (email) => {
        const emailTaken = await User.findOne({ email });
        if (emailTaken) {
          return Promise.reject('E-mail already in use');
        }
      }),
    body('name').notEmpty().withMessage('Add a name'),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Use a password with more then 5 characters'),
  ],
  authController.postSignup
);

router.get('/token/:token', authController.getToken);

export default router;
