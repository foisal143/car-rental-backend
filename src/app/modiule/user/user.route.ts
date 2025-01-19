import express from 'express';
import { userControlar } from './user.controlar';
import auth from '../../middleware/auth';
import UserRole from '../../constent/userRole';
const router = express.Router();
router.get('/', auth(UserRole.admin), userControlar.getAllUserControlar);
router.get('/:email', userControlar.getSingleUser);
export const userRouter = router;
