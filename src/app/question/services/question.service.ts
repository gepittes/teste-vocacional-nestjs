import { Injectable } from '@nestjs/common';
import {
  Group,
  Question,
  QuestionGroup,
  QuestionGroupOption,
} from '../interfaces/question.interface';
import { ListResponse } from '../../../common/interface/requests.interface';
import { allQuestions } from '../mock/questions.mock';

@Injectable()
export class QuestionService {
  /**
   * @TODO: implements question repository to register and edit questions by system
   * @TODO: pass all questions to database
   */

  /**
   * @param group
   * @param questionGroup
   * @param option
   */
  getQuestion(
    group: Group,
    questionGroup: QuestionGroup,
    option: QuestionGroupOption,
  ): Promise<ListResponse<Question>> {
    const { questions } = allQuestions.find(
      (question) => question.group === group,
    );

    const question = questions.find(
      (question) =>
        question.questionGroup === Number(questionGroup) &&
        question.questionGroupOption === option,
    );

    return Promise.resolve({ items: [question] });
  }

  getQuestionsByGroup(group: Group): Promise<ListResponse<Question>> {
    const { questions } = allQuestions.find(
      (question) => question.group === group,
    );

    return Promise.resolve({ items: questions });
  }
}
