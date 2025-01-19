import express from 'express';
import cors from 'cors';
import { userRouter } from './app/modiule/user/user.route';
import { authRouter } from './app/modiule/auth/auth.routes';
import globalErrorHandler from './app/error/globalErrorHandler';
import notFound from './app/error/notFound';
import { carRouter } from './app/modiule/car/car.route';
import { bookingRouter } from './app/modiule/bookings/booking.route';
import { paymentRouter } from './app/modiule/payment/payment.route';
const app = express();

// app parser
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// app route
const allRoutes = [
  {
    path: '/api/auth',
    route: authRouter,
  },
  {
    path: '/api/users',
    route: userRouter,
  },
  {
    path: '/api/cars',
    route: carRouter,
  },
  {
    path: '/api/bookings',
    route: bookingRouter,
  },
  {
    path: '/api/payment',
    route: paymentRouter,
  },
];

allRoutes.forEach(ele => {
  app.use(ele.path, ele.route);
});

// error handling
app.use(globalErrorHandler);
app.use(notFound);

export default app;
