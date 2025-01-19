import { TErrorSoureces } from './errorSources.interface';

export type TErrorReturnValue = {
  errorSources: TErrorSoureces;
  message: string;
  statusCode: number;
};
