import cathcAsync from '../../utilits/catchAsync';
import { carServices } from './car.service';

const createCarControlar = cathcAsync(async (req, res) => {
  const carInfo = req.body;
  const data = await carServices.createCar(carInfo);
  res.status(201).send({
    success: true,
    message: 'car created successfully',
    data,
  });
});

const getAllCarControlar = cathcAsync(async (req, res) => {
  const data = await carServices.getAllCar(req.query);

  res.send({
    success: true,
    message: 'Cars retrieved successfully',
    data,
  });
});

const getSingleCarControlar = cathcAsync(async (req, res) => {
  const id = req.params.id;
  const data = await carServices.getSingleCar(id);
  res.send({
    success: true,
    message: 'A Car retrieved successfully',
    data,
  });
});

const updateCarControlar = cathcAsync(async (req, res) => {
  const id = req.params.id;
  const data = await carServices.updateACar(id, req.body);
  res.send({
    success: true,
    message: 'Car successfully updated',
    data,
  });
});

const deleteCarControlar = cathcAsync(async (req, res) => {
  const data = await carServices.deleteCar(req.params.id);
  res.send({
    success: true,
    message: 'Car deleted Successfull!',
    data,
  });
});
export const carControlar = {
  createCarControlar,
  getAllCarControlar,
  getSingleCarControlar,
  updateCarControlar,
  deleteCarControlar,
};
