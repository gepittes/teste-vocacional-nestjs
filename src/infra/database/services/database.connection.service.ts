import { MongoClient } from 'mongodb';
import * as process from 'process';
import mongoose from 'mongoose';
import { Logger } from '@nestjs/common';

export class MongoConnectionService {
  private mongoClient: MongoClient;
  private logger = new Logger(MongoConnectionService.name);

  async connect(): Promise<void> {
    try {
      await mongoose.connect(process.env.MONGO_CONNECTION, {
        maxPoolSize: 600,
      });
      // this.mongoClient = await MongoClient.connect(
      //   process.env.MONGO_CONNECTION,
      // );

      this.logger.log(`Connected to mongodb ${process.env.MONGO_CONNECTION}`);
    } catch {
      this.logger.error(
        `Failed connecting to database ${process.env.MONGO_CONNECTION}`,
      );
    }
  }
}
