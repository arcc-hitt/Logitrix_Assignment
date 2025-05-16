import dotenv from 'dotenv';
dotenv.config();

import { connect } from 'mongoose';
import app from './app';
import startCronJob from './cron';

const PORT = process.env.PORT || 3000;

connect(process.env.MONGO_URI!)                             
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
    startCronJob(); 
  })
  .catch(err => console.error(err));
