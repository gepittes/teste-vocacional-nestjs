import { ResponseQuestionRepository } from '../../../repositories/response-question/response-question.repository';
import { ResponseQuestions } from '../../../../app/response-question/interfaces/response-questions.interface';
import { ResponseQuestionModel } from '../../schema/response-question/response-question.schema';
import { Session } from '../../../../app/session/interfaces/session.interface';
import { Group } from '../../../../app/question/interfaces/question.interface';
import { convertToJson } from '../../mongoose-utils/conervertToJson.util';

export class MongooseResponseQuestionRepository
  implements ResponseQuestionRepository
{
  /**
   * @param sessionHash
   */
  async getResponsesBySession(
    sessionHash: string,
  ): Promise<ResponseQuestions[]> {
    try {
      const responses = await ResponseQuestionModel.find({
        sessionHash,
      }).select({ __v: 0 });

      return convertToJson<ResponseQuestions[]>(responses);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @param response
   */
  async registerResponse(
    response: Omit<ResponseQuestions, '_id'>,
  ): Promise<ResponseQuestions> {
    const responseCreated = await ResponseQuestionModel.create(response);

    return convertToJson<ResponseQuestions>(responseCreated);
  }

  async getResponseBySessionHashAndGroup(
    sessionHash: Session['sessionHash'],
    group: Group,
  ): Promise<ResponseQuestions[]> {
    const responses = await ResponseQuestionModel.find({
      sessionHash,
      group,
    });

    return convertToJson<ResponseQuestions[]>(responses);
  }
}
