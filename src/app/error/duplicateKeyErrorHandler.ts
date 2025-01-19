import { TErrorReturnValue } from '../interface/errorHandler.interface';
import { TErrorSoureces } from '../interface/errorSources.interface';

const duplicateKeyErrorHandler = (error: any): TErrorReturnValue => {
  const errorSources: TErrorSoureces = [
    {
      path: error?.keyValue?.name,
      message: error?.errmsg,
    },
  ];

  return {
    message: `Duplicate name found of ${error?.keyValue.name} `,
    statusCode: 403,
    errorSources,
  };
};

export default duplicateKeyErrorHandler;
