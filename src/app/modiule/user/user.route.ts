import express from 'express';
import { userControlar } from './user.controlar';
const router = express.Router();
router.get('/', userControlar.getAllUserControlar);
export const userRouter = router;
