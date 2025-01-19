import express from 'express';
import { paymentControlar } from './payment.controlar';
const router = express.Router();

router.post('/success', paymentControlar.paymentSuccess);
router.post('/faild', paymentControlar.paymentFaield);

export const paymentRouter = router;
