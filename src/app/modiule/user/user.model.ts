import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import { NextFunction } from 'express';
import { config } from '../../config';
const userSchema = new Schema<TUser, UserModel>(
  {
    name: { type: String, required: [true, 'name is required'] },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
    },
    password: { type: String, required: [true, 'password is required'] },
    phone: { type: String, required: [true, 'phone number is required'] },
    role: { type: String, required: true },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// bcrypt the user password

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt));
  next();
});

userSchema.post('save', function (user, next) {
  user.password = '';
  next();
});
userSchema.statics.isUserExist = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

export const User = model<TUser, UserModel>('User', userSchema);
