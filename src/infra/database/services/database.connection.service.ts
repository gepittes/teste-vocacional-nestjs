import { MongoClient } from 'mongodb';
import * as process from 'process';
import mongoose from 'mongoose';

export class MongoConnectionService {
  private mongoClient: MongoClient;

  async connect(): Promise<void> {
    try {
      await mongoose.connect(process.env.MONGO_CONNECTION, {
        maxPoolSize: 600,
      });
      // this.mongoClient = await MongoClient.connect(
      //   process.env.MONGO_CONNECTION,
      // );

      console.log(`Connected to mongodb ${process.env.MONGO_CONNECTION}`);
    } catch {
      throw new Error(`Failed connecting to database`);
    }
  }
}
