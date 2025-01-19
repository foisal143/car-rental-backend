import { TErrorReturnValue } from '../interface/errorHandler.interface';
import { TErrorSoureces } from '../interface/errorSources.interface';

const castErrorHandler = (error: any): TErrorReturnValue => {
  const regex = /value "([^"]+)" \(/;
  const match = error.message.match(regex);

  const extractedValue = match[1];
  const errorSources: TErrorSoureces = [
    {
      path: error.path,
      message:
        `Academic department it is not valid id:  ${extractedValue}` ||
        'Academic department invalid id',
    },
  ];
  return {
    message: 'Invalid id',
    statusCode: 403,
    errorSources,
  };
};

export default castErrorHandler;
