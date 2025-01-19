import { Request, Response } from 'express';
import Booking from '../bookings/booking.model';

const paymentSuccess = async (req: Request, res: Response) => {
  const { tranjactionId } = req.query;
  const payStatusRes = await fetch(
    `https://sandbox.aamarpay.com/api/v1/trxcheck/request.php?request_id=${tranjactionId}&store_id=aamarpaytest&signature_key=dbb74894e82415a2f7ff0ec3a97e4183&type=json`,
    {
      method: 'GET',
    }
  );
  const payStatus = await payStatusRes.json();
  if ((payStatus.pay_status = 'Successful')) {
    await Booking.findOneAndUpdate({ tranjactionId }, { payStatus: 'paid' });
  }

  res.send(`<h1>Payment Success </h1>`);
};
const paymentFaield = (req: Request, res: Response) => {
  res.send(`<h1>Payment faield </h1>`);
};

export const paymentControlar = { paymentSuccess, paymentFaield };
