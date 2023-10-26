import { ResponseQuestions } from '../../../app/response-question/interfaces/response-questions.interface';
import { Session } from '../../../app/session/interfaces/session.interface';
import { Group } from '../../../app/question/interfaces/question.interface';

export const RESPONSE_QUESTION_REPOSITORY = Symbol(
  'RESPONSE_QUESTION_REPOSITORY',
);

export interface ResponseQuestionRepository {
  /**
   * Return all responses by a session id
   * @param sessionHash
   */
  getResponsesBySession(sessionHash: string): Promise<ResponseQuestions[]>;

  /**
   * @param response
   */
  registerResponse(
    response: Omit<ResponseQuestions, '_id'>,
  ): Promise<ResponseQuestions>;

  getResponseBySessionHashAndGroup(
    sessionHash: Session['sessionHash'],
    group: Group,
  ): Promise<ResponseQuestions[]>;
}
