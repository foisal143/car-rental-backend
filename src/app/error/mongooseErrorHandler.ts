import { TErrorReturnValue } from '../interface/errorHandler.interface';
import { TErrorSoureces } from '../interface/errorSources.interface';

const mongooseErrorHandler = (error: any): TErrorReturnValue => {
  const errorSources: TErrorSoureces = [
    {
      path: error?.errors?.name?.path,
      message: error?.errors?.name?.message,
    },
  ];

  return {
    message: 'Academic Departemnt Validation Error!',
    statusCode: 403,
    errorSources,
  };
};

export default mongooseErrorHandler;
