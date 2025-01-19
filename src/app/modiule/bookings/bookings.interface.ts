import { Types } from 'mongoose';
import { TCar } from '../car/car.interface';
import { TUser } from '../user/user.interface';

export interface TCarWithId extends TCar {
  _id: string;
}

export type TBooking = {
  car: TCarWithId;
  user: TUser;
  date: string;
  totalCost: number;
  startTime: string;
  endTime: string;
  payStatus: string;
  status: string;
  tranjactionId: string;
};
