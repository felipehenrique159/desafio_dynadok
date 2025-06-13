import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
}, { timestamps: true });

export const ClientModel = mongoose.model('Client', ClientSchema);