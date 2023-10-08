import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './app/user/user.module';
import { MongoConnectionService } from './infra/database/services/database.connection.service';
import { ParticipantModule } from './app/participant/participant.module';
import { QuestionModule } from './app/question/question.module';
import { ResponseQuestionModule } from './app/response-question/response-question.module';
import { SessionModule } from './app/session/session.module';

@Module({
  imports: [
    UserModule,
    ParticipantModule,
    QuestionModule,
    ResponseQuestionModule,
    SessionModule,
  ],
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
    await this.mongoConnectionService.connect();
  }
}
