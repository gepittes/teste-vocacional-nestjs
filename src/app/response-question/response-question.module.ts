import { Module } from '@nestjs/common';
import { ResponseQuestionController } from './response-question.controller';
import { ResponseQuestionService } from './services/response-question.service';
import { RESPONSE_QUESTION_REPOSITORY } from '../../infra/repositories/response-question/response-question.repository';
import { MongooseResponseQuestionRepository } from '../../infra/database/repository/response-repository/mongoose-response-question.repository';

@Module({
  providers: [
    ResponseQuestionService,
    {
      provide: RESPONSE_QUESTION_REPOSITORY,
      useClass: MongooseResponseQuestionRepository,
    },
  ],
  controllers: [ResponseQuestionController],
})
export class ResponseQuestionModule {}
