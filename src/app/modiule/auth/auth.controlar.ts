import cathcAsync from '../../utilits/catchAsync';
import { authServices } from './auth.services';

const signUpUser = cathcAsync(async (req, res) => {
  const data = await authServices.signUpUser(req.body);
  res.send({
    success: true,
    message: 'User sign up successfull',
    data,
  });
});

const signInuser = cathcAsync(async (req, res) => {
  const data = await authServices.signInUser(req.body);
  res.send({
    success: true,
    message: 'User sign in successfull',
    data: {
      user: data.user,
      token: data.token,
    },
  });
});

export const authControlar = { signUpUser, signInuser };
