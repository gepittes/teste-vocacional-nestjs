import { ResponseQuestionRepository } from '../../../repositories/response-question/response-question.repository';
import { ResponseQuestions } from '../../../../app/response-question/interfaces/response-questions.interface';
import { ListResponse } from '../../../../common/interface/requests.interface';
import { ResponseQuestionModel } from '../../schema/response-question/response-question.schema';
import { Session } from '../../../../app/session/interfaces/session.interface';
import { Group } from '../../../../app/question/interfaces/question.interface';

export class MongooseResponseQuestionRepository
  implements ResponseQuestionRepository
{
  /**
   * @param sessionHash
   */
  async getResponsesBySession(
    sessionHash: string,
  ): Promise<ListResponse<ResponseQuestions>> {
    try {
      const responsesQuestions = await ResponseQuestionModel.find({
        sessionHash,
      })
        .select({ __v: 0 })
        .lean();

      return {
        items: responsesQuestions,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @param response
   */
  async registerResponse(
    response: Omit<ResponseQuestions, '_id'>,
  ): Promise<ListResponse<ResponseQuestions>> {
    const created = await ResponseQuestionModel.create(response);

    return { items: [created] };
  }

  async getResponseBySessionHashAndGroup(
    sessionHash: Session['sessionHash'],
    group: Group,
  ): Promise<ResponseQuestions[]> {
    const responses = await ResponseQuestionModel.find({
      sessionHash,
      group,
    });

    return responses.map((response) => JSON.parse(JSON.stringify(response)));
  }
}
