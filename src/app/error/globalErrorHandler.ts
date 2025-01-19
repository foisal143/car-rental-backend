import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utilits/AppError';
import zodErrorHandler from './zodErrorHandler';
import mongooseErrorHandler from './mongooseErrorHandler';
import castErrorHandler from './castErrorHandler';
import duplicateKeyErrorHandler from './duplicateKeyErrorHandler';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let message = 'somtihing went wrong!';
  let statusCode = error?.statusCode || 500;
  let errorSources = [{ path: '/', message: 'Somthing went wrong!' }];

  if (error instanceof ZodError) {
    const simplifiedError = zodErrorHandler(error);
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources;
  } else if (error?.errors?.name?.name === 'ValidatorError') {
    const simplifiedError = mongooseErrorHandler(error);
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources;
  } else if (error?.name === 'CastError') {
    const simplifiedError = castErrorHandler(error);
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources;
  } else if (error?.errorResponse?.code === 11000) {
    const simplifiedError = duplicateKeyErrorHandler(error);
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources;
  } else if (error instanceof AppError) {
    message = error.message;
    statusCode = error.statusCode;
    errorSources = [
      {
        path: '',
        message: error.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error.message;
    errorSources = [
      {
        path: '',
        message: error.message,
      },
    ];
  } else {
    message = error?.message;
  }
  res.status(statusCode).send({
    success: false,
    message,
    errorSources,
    stack: error.stack,
    error,
  });
};

export default globalErrorHandler;
