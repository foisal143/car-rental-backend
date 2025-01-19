import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { carValidations } from './car.validation';
import { carControlar } from './car.controlar';
import auth from '../../middleware/auth';
import UserRole from '../../constent/userRole';

const router = express.Router();
router.post(
  '/',
  validateRequest(carValidations.createCarValidation),
  auth(UserRole.admin),
  carControlar.createCarControlar
);

router.get('/', carControlar.getAllCarControlar);
router.get('/:id', carControlar.getSingleCarControlar);
router.put(
  '/:id',
  validateRequest(carValidations.updateCarValidation),
  auth(UserRole.admin),
  carControlar.updateCarControlar
);
router.delete('/:id', auth(UserRole.admin), carControlar.deleteCarControlar);
export const carRouter = router;
