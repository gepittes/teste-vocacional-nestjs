import { ListResponse } from '../../../common/interface/requests.interface';
import { ResponseQuestions } from '../../../app/response-question/interfaces/response-questions.interface';

export const RESPONSE_QUESTION_REPOSITORY = Symbol(
  'RESPONSE_QUESTION_REPOSITORY',
);

export interface ResponseQuestionRepository {
  /**
   * Return all responses by a session id
   * @param sessionHash
   */
  getResponsesBySession(
    sessionHash: string,
  ): Promise<ListResponse<ResponseQuestions>>;

  /**
   * @param response
   */
  registerResponse(
    response: Omit<ResponseQuestions, '_id'>,
  ): Promise<ListResponse<ResponseQuestions>>;
}
