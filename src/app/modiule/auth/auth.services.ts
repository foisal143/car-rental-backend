import httpStatus from 'http-status';
import { config } from '../../config';
import { AppError } from '../../utilits/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import jwt from 'jsonwebtoken';
const signUpUser = async (payload: TUser) => {
  const user = await User.isUserExist(payload?.email);

  if (user) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      `${payload.email} is already exist`
    );
  }
  const result = await User.create(payload);
  return result;
};

const signInUser = async (payload: { email: string; password: string }) => {
  const user = await User.isUserExist(payload?.email);
  const isPasswordMatch = await User.isPasswordMatch(
    user.password,
    payload.password
  );
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'No user found in this email');
  }

  if (!isPasswordMatch) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'password not matched please enter your password'
    );
  }

  const jwtPayload = { ...payload, role: user.role };

  const token = jwt.sign(jwtPayload, config.jwt_access_token as string, {
    expiresIn: '10d',
  });

  return { token, user: { email: user.email, role: user.role } };
};
export const authServices = { signUpUser, signInUser };
