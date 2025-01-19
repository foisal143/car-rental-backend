import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
const userSchema = new Schema<TUser, UserModel>(
  {
    name: { type: String, required: [true, 'name is required'] },
    image: { type: String, required: true },
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

// statics method here
userSchema.statics.isUserExist = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

userSchema.statics.isPasswordMatch = async (
  hashPassword: string,
  pleantextPassword: string
) => {
  const isMatched = await bcrypt.compare(pleantextPassword, hashPassword);
  return isMatched;
};
export const User = model<TUser, UserModel>('User', userSchema);
