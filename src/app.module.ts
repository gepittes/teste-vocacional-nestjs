import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoConnectionService } from './infra/database/services/database.connection.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MongoConnectionService],
})
export class AppModule {
  constructor(private mongoConnectionService: MongoConnectionService) {}

  async onModuleInit() {
    this.mongoConnectionService.connect();
  }
}
