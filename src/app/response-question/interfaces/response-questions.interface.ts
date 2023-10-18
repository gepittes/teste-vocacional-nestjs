import {
  Group,
  QuestionGroup,
  TypeResponse,
} from '../../question/interfaces/question.interface';
import { ObjectId } from 'mongodb';

export interface ResponseQuestions {
  _id: ObjectId;
  /**
   * Hash to identify what session is this response
   */
  sessionHash: string;
  /**
   * identity what group is this response
   */
  group: Group;
  /**
   * alternative selected by user
   */
  response: TypeResponse;
  /**
   * what subgroup is this response
   */
  questionGroup: QuestionGroup;
}

export interface ResponseFinal {
  [key: string]: {
    counterResponse: number;
  };
}
