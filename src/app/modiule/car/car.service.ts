import httpStatus from 'http-status';
import { AppError } from '../../utilits/AppError';
import QueryBuilder from '../../utilits/queryBuilder';
import { TCar } from './car.interface';
import { Car } from './car.model';

const createCar = async (payload: TCar) => {
  const result = await Car.create(payload);
  return result;
};

const getAllCar = async (query: Record<string, unknown>) => {
  const carQuery = new QueryBuilder(Car.find({ isDeleted: false }), query)
    .sort()
    .search(['name'])
    .paginateQuery()
    .filter()
    .fieldsFilter();

  const data = await carQuery?.modelQuery;
  return data;
};

const getSingleCar = async (id: string) => {
  const isCarExist = await Car.findById(id);
  if (!isCarExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This car is not found');
  }
  const data = await Car.findById(id);
  return data;
};

const updateACar = async (id: string, payload: Partial<TCar>) => {
  const isCarExist = await Car.findById(id);
  if (!isCarExist) {
    throw new AppError(404, 'This car is not find');
  }
  const data = await Car.findByIdAndUpdate(id, payload, { new: true });
  return data;
};

const deleteCar = async (id: string) => {
  const isCarExist = await Car.findById(id);
  if (!isCarExist) {
    throw new AppError(404, 'This car is not find');
  }
  const result = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const carServices = {
  createCar,
  getAllCar,
  getSingleCar,
  updateACar,
  deleteCar,
};
