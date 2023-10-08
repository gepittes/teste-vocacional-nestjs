import { ResponseQuestions } from '../interfaces/response-questions.interface';
import { ApiProperty } from '@nestjs/swagger';
import {
  Group,
  QuestionGroup,
  TypeResponse,
} from '../../question/interfaces/question.interface';

export class RegisterResponseQuestionDto
  implements Omit<ResponseQuestions, '_id'>
{
  @ApiProperty({ description: '' })
  group: Group;

  @ApiProperty({ description: '' })
  questionGroup: QuestionGroup;

  @ApiProperty({ description: '' })
  response: TypeResponse;

  @ApiProperty({ description: '' })
  sessionHash: string;
}
