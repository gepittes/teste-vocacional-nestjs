import { Module } from '@nestjs/common';
import { QuestionService } from './services/question.service';
import { QuestionController } from './question.controller';

@Module({
  imports: [],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
