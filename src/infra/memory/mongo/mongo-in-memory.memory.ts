import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection } from 'mongoose';
import * as process from 'process';

export class MongoInMemory {
  private constructor(
    private mongoMemoryServer: MongoMemoryServer,
    private connection: Connection,
  ) {}
  static async startServer(): Promise<MongoInMemory> {
    const mongoServer: MongoMemoryServer = await MongoMemoryServer.create();
    const mongoUri: string = mongoServer.getUri();
    const mongoConnection = (await connect(mongoUri)).connection;

    process.env.MONGO_CONNECTION = mongoUri;

    return new MongoInMemory(mongoServer, mongoConnection);
  }

  async shutDown(): Promise<void> {
    await this.connection.dropDatabase();
    await this.connection.close();
    await this.mongoMemoryServer.stop();
  }

  async clearCollections(): Promise<void> {
    const collections = this.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
}
