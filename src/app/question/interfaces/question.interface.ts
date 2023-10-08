export enum TypeResponse {
  A = 'a',
  B = 'b',
  WITHOUT_RESPONSE = 'without_response',
}

export enum Group {
  GROUP_I = 'group_i',
  GROUP_II = 'group_ii',
  GROUP_III = 'group_iii',
  GROUP_IV = 'group_iv',
  GROUP_V = 'group_v',
}

export interface Question {
  statement: string;
  group: Group;
  questionGroup: QuestionGroup;
  questionGroupOption: QuestionGroupOption;
}

export interface GroupQuestions {
  group: Group;
  questions: Question[];
}

export interface ResponseQuestion {
  response: TypeResponse;
  group: Group;
  question: QuestionGroup;
  questionGroupOption: QuestionGroupOption;
}

export enum QuestionGroupOption {
  A = 'a',
  B = 'b',
}

export type QuestionGroup = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
