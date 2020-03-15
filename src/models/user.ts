import mongoose from 'mongoose';
import { IUser } from '../interfaces/IUser';

const User = new mongoose.Schema(
  {
    active: Boolean,
    email: String,
    password: String,
    phone: String,
    username: String,
  }
);

export default mongoose.model<IUser & mongoose.Document>('User', User);
