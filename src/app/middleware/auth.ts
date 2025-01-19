// @ts-nocheck
import { NextFunction, Request, Response } from 'express';
import { config } from '../config';
import { Role } from '../modiule/user/user.interface';
import { User } from '../modiule/user/user.model';
import { AppError } from '../utilits/AppError';
import cathcAsync from '../utilits/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';

const auth = (...userRole: Role[]) => {
  return cathcAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tokenWithBearer = req.headers.authorization;
    const token = tokenWithBearer?.split(' ')[1];

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthrized access');
    }
    const decode = jwt.verify(token, config.jwt_access_token as string);

    const { email, role } = decode as JwtPayload;
    const user = await User.isUserExist(email);

    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthrized access');
    }
    if (!userRole.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthrized access');
    }
    req.user = decode as JwtPayload;

    next();
  });
};

export default auth;
