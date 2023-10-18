import { Inject, Injectable } from '@nestjs/common';
import {
  RESPONSE_QUESTION_REPOSITORY,
  ResponseQuestionRepository,
} from '../../../infra/repositories/response-question/response-question.repository';
import { validateObject } from '../../../common/utils/object.utils';
import {
  ResponseFinal,
  ResponseQuestions,
} from '../interfaces/response-questions.interface';
import { Session } from '../../session/interfaces/session.interface';
import {
  Group,
  TypeResponse,
} from '../../question/interfaces/question.interface';
import { ListResponse } from '../../../common/interface/requests.interface';
import { SessionService } from '../../session/services/session.service';

@Injectable()
export class ResponseQuestionService {
  constructor(
    @Inject(RESPONSE_QUESTION_REPOSITORY)
    private repository: ResponseQuestionRepository,
    private sessionService: SessionService,
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

  async calculateResponse(
    sessionHash: Session['sessionHash'],
  ): Promise<ListResponse<ResponseFinal>> {
    const { items } = await this.repository.getResponsesBySession(sessionHash);

    const final: ResponseFinal = {};

    Object.keys(Group).forEach((key) => {
      const counterResponse = items.filter(
        (response) =>
          response.response !== TypeResponse.WITHOUT_RESPONSE &&
          response.group === Group[key],
      ).length;

      const keyObject = Group[key];

      final[keyObject] = {
        counterResponse,
      };
    });

    await this.sessionService.finishSession(sessionHash);

    return { items: [final] };
  }
}
