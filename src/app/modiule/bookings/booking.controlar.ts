import { JwtPayload } from 'jsonwebtoken';
import { AppError } from '../../utilits/AppError';
import cathcAsync from '../../utilits/catchAsync';
import { Car } from '../car/car.model';
import { User } from '../user/user.model';
import { bookingServices } from './booking.services';
import Booking from './booking.model';
import httpStatus from 'http-status';

const createBookingControlar = cathcAsync(async (req, res) => {
  const { car, ...reaming } = req.body;
  // console.log(carinfo);
  const { _id: carId } = car;

  const isCarExist = await Car.findById(carId);
  if (!isCarExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car is not found!');
  }

  if (isCarExist.status === 'unavailable') {
    throw new AppError(httpStatus.BAD_REQUEST, 'This car is not available !');
  }

  const updateCarStatus = await Car.findByIdAndUpdate(
    carId,
    {
      status: 'unavailable',
    },
    { new: true }
  );

  const isCarDeleted = isCarExist.isDeleted;
  if (isCarDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This car is already deleted!');
  }
  // @ts-ignore
  const { email } = req?.user as JwtPayload;
  const user = await User.isUserExist(email);

  const bookingInfo = {
    car: updateCarStatus,
    ...reaming,
    user,
  };
  const data = await bookingServices.createBooking(bookingInfo);
  res.send({
    success: true,
    message: 'Car booking successfull!',
    data,
  });
});

const getAllBookings = cathcAsync(async (req, res) => {
  const data = await bookingServices.getAllBookings();
  res.send({
    success: true,
    message: 'All bookings retrived successfull!',
    data,
  });
});

const getBookingForUser = cathcAsync(async (req, res) => {
  // @ts-ignore
  const { email } = req.user as JwtPayload;
  const user = await User.isUserExist(email);
  const data = await bookingServices.getBookingForUser(user?.email);
  res.send({
    success: true,
    message: 'Bookings retrived for user successfull!',
    data,
  });
});

const returnCar = cathcAsync(async (req, res) => {
  const returnInfo = req.body;
  const data = await bookingServices.returnCar(returnInfo);

  res.send({
    success: true,
    message: 'Car return successfull!',
    data,
  });
});

export const bookingControlar = {
  createBookingControlar,
  getAllBookings,
  getBookingForUser,
  returnCar,
};
