import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '../config';

export default async (): Promise<Db> => {
  const mongoConnectionOptions = {
    useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true
  }
  const connection = await mongoose.connect(config.databaseURL, mongoConnectionOptions);
  return connection.connection.db;
}
