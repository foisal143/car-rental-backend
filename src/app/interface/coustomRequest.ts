import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface coustomRequest extends Request {
  user?: JwtPayload;
}
