import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { QuestionService } from './services/question.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Group,
  QuestionGroup,
  QuestionGroupOption,
} from './interfaces/question.interface';
import { ResponseUtils } from '../../infra/reponseUtils/response.utils';
import { Request, Response } from 'express';

@ApiTags('Questions')
@Controller('questions')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Get('/:group/:questionGroup/:option')
  @ApiOperation({ summary: 'Return only one question' })
  async getOnlyOneQuestion(
    @Res() res: Response,
    @Req() req: Request,
    @Param('group') group: Group,
    @Param('questionGroup') questionGroup: QuestionGroup,
    @Param('option') option: QuestionGroupOption,
  ) {
    const response = await this.questionService.getQuestion(
      group,
      questionGroup,
      option,
    );

    return ResponseUtils.successResponse(req, res, response);
  }

  @Get(':group')
  @ApiOperation({ summary: 'Return only questions by group' })
  async getQuestionsByGroup(
    @Res() res: Response,
    @Req() req: Request,
    @Param('group') group: Group,
  ) {
    const response = await this.questionService.getQuestionsByGroup(group);

    return ResponseUtils.successResponse(req, res, response);
  }
}
