import { Request, Response } from 'express';
import { userServices } from './user.services';
import cathcAsync from '../../utilits/catchAsync';

const getAllUserControlar = cathcAsync(async (req: Request, res: Response) => {
  const data = await userServices.getAllUser();

  res.send({
    success: true,
    message: 'All user retrived successfull',
    data,
  });
});
const getSingleUser = cathcAsync(async (req: Request, res: Response) => {
  const data = await userServices.getSingleUser(req.params.email);

  res.send({
    success: true,
    message: ' user is retrived successfull',
    data,
  });
});

export const userControlar = { getAllUserControlar, getSingleUser };
