import httpStatus from 'http-status';
import { AppError } from '../../utilits/AppError';
import { User } from './user.model';

const getAllUser = async () => {
  const result = await User.find();
  return result;
};
const getSingleUser = async (email: string) => {
  const result = await User.findOne({ email });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return result;
};

export const userServices = { getAllUser, getSingleUser };
