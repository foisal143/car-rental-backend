import httpStatus from 'http-status';
import { AppError } from '../../utilits/AppError';
import { Car } from '../car/car.model';
import Booking from './booking.model';
import { TBooking } from './bookings.interface';
import moment from 'moment';
import { generateTranId } from '../../utilits/getTranId';

const createBooking = async (payload: TBooking) => {
  const { user } = payload;
  const tranjactionId = generateTranId();
  payload.tranjactionId = tranjactionId;
  const result = (
    await (await Booking.create(payload)).populate('user')
  ).populate('car');
  const priceInBdt = payload.totalCost * 120;

  const paymentData = {
    store_id: 'aamarpaytest',
    tran_id: tranjactionId,
    success_url: `http://localhost:5000/api/payment/success?tranjactionId=${tranjactionId}`,
    fail_url: 'http://localhost:5000/api/payment/faild',
    cancel_url: 'http://localhost:5173',
    amount: `${priceInBdt}`,
    currency: 'BDT',
    signature_key: 'dbb74894e82415a2f7ff0ec3a97e4183',
    desc: 'Drive Secuire payments!',
    cus_name: user.name,
    cus_email: user.email,
    cus_add1: 'House B-158 Road 22',
    cus_add2: 'Mohakhali DOHS',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1206',
    cus_country: 'Bangladesh',
    cus_phone: user.phone,
    type: 'json',
  };

  if (await result) {
    const paymentLinkRes = await fetch(
      `https://​sandbox​.aamarpay.com/jsonpost.php`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      }
    );
    const payResult = await paymentLinkRes.json();

    return payResult;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, 'Booking faild!');
  }
};

const getAllBookings = async () => {
  const result = await Booking.find().populate('user').populate('car');
  return result;
};

const getBookingForUser = async (email: string) => {
  const result = await Booking.find({ 'user.email': email });
  return result;
};

const returnCar = async (payload: { bookingId: string; endTime: string }) => {
  const isBookingExist = await Booking.findById(payload.bookingId);
  if (!isBookingExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found!');
  }

  const carsInfo = isBookingExist.car;
  const data = await Car.findByIdAndUpdate(
    carsInfo._id,
    { status: 'available' },
    { new: true }
  );

  // convert start time and end time inot hours
  const startTime = isBookingExist.startTime;
  const endTime = payload.endTime;
  const start = moment(startTime, 'HH:mm');
  const end = moment(endTime, 'HH:mm');
  if (start > end) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Start time should be less then end time!'
    );
  }
  // Calculate the difference in hours
  const hours = end.diff(start, 'minutes') / 60;
  console.log(hours);
  // calculate total cost

  const totalCost = parseFloat((carsInfo.pricePerHour * hours).toFixed(2));

  const result = await Booking.findByIdAndUpdate(
    payload.bookingId,
    {
      endTime: payload.endTime,
      totalCost,
      'car.status': 'available',
    },
    { new: true }
  );
  return result;
};

export const bookingServices = {
  createBooking,
  getAllBookings,
  getBookingForUser,
  returnCar,
};
