import { MongoClient } from 'mongodb';

export class MongoConnectionService {
  private mongoClient: MongoClient;

  async connect(): Promise<void> {
    try {
      this.mongoClient = await MongoClient.connect(
        process.env.MONGO_CONNECTION,
      );

      console.log('Connected to mongodb');
    } catch {
      throw new Error(`Failed connecting to database`);
    }
  }
}
