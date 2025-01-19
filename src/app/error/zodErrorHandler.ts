import { ZodError } from 'zod';
import { TErrorReturnValue } from '../interface/errorHandler.interface';
import { TErrorSoureces } from '../interface/errorSources.interface';

const zodErrorHandler = (error: ZodError): TErrorReturnValue => {
  const errorSources = error?.issues.map(issue => {
    return {
      path: `${issue?.path[issue?.path?.length - 1]}`,
      message: issue?.message,
    };
  });

  return {
    errorSources,
    statusCode: 403,
    message: 'Validation Error',
  };
};

export default zodErrorHandler;
