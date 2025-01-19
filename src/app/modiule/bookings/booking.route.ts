import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { bookingValidations } from './booking.validation';
import auth from '../../middleware/auth';
import UserRole from '../../constent/userRole';
import { bookingControlar } from './booking.controlar';

const router = express.Router();

router.post(
  '/',
  auth(UserRole.user),
  validateRequest(bookingValidations.createBookingValidation),
  bookingControlar.createBookingControlar
);

router.get('/', auth(UserRole.admin), bookingControlar.getAllBookings);
router.get(
  '/my-bookings',
  auth(UserRole.user),
  bookingControlar.getBookingForUser
);
router.put('/return', auth(UserRole.admin), bookingControlar.returnCar);
export const bookingRouter = router;
