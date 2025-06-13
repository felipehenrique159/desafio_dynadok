import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import clientRouter from './interfaces/http/routes/ClientRoutes';

const app = express();
app.use(express.json());

app.use('/api/clients', clientRouter);

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URL || '')
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API running on port ${PORT}`);
    });
  })
  .catch(console.error);
