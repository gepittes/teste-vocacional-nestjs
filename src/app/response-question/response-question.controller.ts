import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseQuestionService } from './services/response-question.service';
import { ResponseUtils } from '../../infra/reponseUtils/response.utils';
import { Request, Response } from 'express';
import { RegisterResponseQuestionDto } from './dto/register-response-question.dto';
import { dataProcessing } from '../../common/utils/object.utils';

@ApiTags('Response-question')
@Controller('response-question')
export class ResponseQuestionController {
  constructor(private service: ResponseQuestionService) {}

  @Get('responses/session/:sessionHash')
  @ApiOperation({})
  async getResponsesBySession(
    @Req() req: Request,
    @Res() res: Response,
    @Param('sessionHash') sessionHash: string,
  ) {
    try {
      const response = await this.service.getResponsesBySession(sessionHash);

      return ResponseUtils.successResponse(req, res, response);
    } catch (error) {
      return ResponseUtils.errorResponse(res, 404, error.message);
    }
  }

  @Get('responses/session/:sessionHash/final-result')
  @ApiOperation({})
  async calculateResponse(
    @Req() req: Request,
    @Res() res: Response,
    @Param('sessionHash') sessionHash: string,
  ) {
    try {
      const response = await this.service.calculateResponse(sessionHash);

      return ResponseUtils.successResponse(req, res, response);
    } catch (error) {
      return ResponseUtils.errorResponse(res, 404, error.message);
    }
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new Response' })
  async registerResponse(
    @Req() req: Request,
    @Res() res: Response,
    @Body() responseDto: RegisterResponseQuestionDto,
  ) {
    try {
      const response = await this.service.registerResponse(
        dataProcessing(responseDto),
      );

      return ResponseUtils.successResponse(req, res, response);
    } catch (error) {
      return ResponseUtils.errorResponse(res, 500, error.message);
    }
  }
}
