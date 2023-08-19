import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './app/user/user.module';
import { MongoConnectionService } from './infra/database/services/database.connection.service';
import { ResponseMiddleware } from './infra/middleware/response.middleware';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, MongoConnectionService],
})
export class AppModule implements NestModule {
  constructor(private mongoConnectionService: MongoConnectionService) {}

  configure( consumer: MiddlewareConsumer ): any {
    consumer.apply(ResponseMiddleware).forRoutes('*')
  }

  async onModuleInit() {
    this.mongoConnectionService.connect();
  }
}
