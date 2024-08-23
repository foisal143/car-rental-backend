import { Model } from 'mongoose';

export type Role = 'user' | 'admin';
export interface TUser {
  name: string;
  email: string;
  role: Role;
  password: string;
  phone: string;
  address: string;
}

export interface UserModel extends Model<TUser> {
  isUserExist(email: string): Promise<TUser>;
}
