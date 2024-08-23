import express from 'express';
import cors from 'cors';
import { userRouter } from './app/modiule/user/user.route';
import { authRouter } from './app/modiule/auth/auth.routes';
const app = express();

// app parser
app.use(cors());
app.use(express.json());

// app route
const allRoutes = [
  {
    path: '/api/auth',
    route: authRouter,
  },
  {
    path: '/api/user',
    route: userRouter,
  },
];

allRoutes.forEach(ele => {
  app.use(ele.path, ele.route);
});

export default app;
