import express from 'express';
import { authControlar } from './auth.controlar';
import validateRequest from '../../middleware/validateRequest';
import { userValidation } from '../user/user.validation';
import { authValidation } from './auth.validation';
const router = express.Router();

router.post(
  '/signup',
  validateRequest(userValidation.createUserValidation),
  authControlar.signUpUser
);

router.post(
  '/signin',
  validateRequest(authValidation.signInValidatiaon),
  authControlar.signInuser
);
export const authRouter = router;
