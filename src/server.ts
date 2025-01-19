import mongoose from 'mongoose';
import app from './app';
import { Request, Response } from 'express';
import { config } from './app/config';
const port = 5000;

async function rootApp() {
  mongoose.connect(config.db_url as string);
  app.get('/', (req: Request, res: Response) => {
    res.send('car data is comming');
  });
}

app.listen(port, () => {
  console.log('server is running on port', port);
});

rootApp();
