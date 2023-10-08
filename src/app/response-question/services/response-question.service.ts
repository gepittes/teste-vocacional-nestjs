import { Inject, Injectable } from '@nestjs/common';
import {
  RESPONSE_QUESTION_REPOSITORY,
  ResponseQuestionRepository,
} from '../../../infra/repositories/response-question/response-question.repository';
import { validateObject } from '../../../common/utils/object.utils';
import { ResponseQuestions } from '../interfaces/response-questions.interface';

@Injectable()
export class ResponseQuestionService {
  constructor(
    @Inject(RESPONSE_QUESTION_REPOSITORY)
    private repository: ResponseQuestionRepository,
  ) {}

  async getResponsesBySession(sessionHash: string) {
    try {
      validateObject({ sessionHash });
      return this.repository.getResponsesBySession(sessionHash);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async registerResponse(response: Omit<ResponseQuestions, '_id'>) {
    try {
      validateObject(response);

      return this.repository.registerResponse(response);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
