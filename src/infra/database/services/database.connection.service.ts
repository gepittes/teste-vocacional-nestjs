import * as process from 'process';
import mongoose from 'mongoose';
import { DatabaseConnectionLogger } from '../logger/database-connection/database-connection.logger.';

export class MongoConnectionService {
  private mongoUriEnvironment: string = process.env.MONGO_CONNECTION;

  constructor(private logger: DatabaseConnectionLogger) {}

  async connect(): Promise<void> {
    try {
      mongoose.set('debug', true);

      await mongoose.connect(this.mongoUriEnvironment, {
        maxPoolSize: 600,
      });

      this.logger.connected(this.mongoUriEnvironment);
    } catch {
      this.logger.failConnect(this.mongoUriEnvironment);
    }
  }
}
