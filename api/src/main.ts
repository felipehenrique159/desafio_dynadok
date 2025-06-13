import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import clientRouter from './interfaces/http/routes/ClientRoutes';

const app = express();
app.use(express.json());

app.use('/api/clients', clientRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
  mongoose.connect(process.env.MONGO_URL || '')
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB:', err.message);
    });
});