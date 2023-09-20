import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './app/user/user.module';
import { MongoConnectionService } from './infra/database/services/database.connection.service';
import { ResponseMiddleware } from './infra/middleware/response.middleware';
import { ParticipantModule } from './app/participant/participant.module';

@Module({
  imports: [UserModule, ParticipantModule],
  controllers: [AppController],
  providers: [AppService, MongoConnectionService],
})
export class AppModule implements NestModule {
  constructor(private mongoConnectionService: MongoConnectionService) {}

  configure(consumer: MiddlewareConsumer): any {
    /**
     * TODO: check how implements middleware to response
     */
    // consumer.apply(ResponseMiddleware).forRoutes('*')
  }

  async onModuleInit() {
    // this.mongoConnectionService.connect();
  }
}
