import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { SessionService } from './services/session.service';
import { Request, Response } from 'express';
import { ResponseUtils } from '../../infra/reponseUtils/response.utils';
import { FinishSessionDto } from './dto/finish-session.dto';

@ApiTags('Session')
@Controller('session')
export class SessionController {
  constructor(private service: SessionService) {}

  @Post('finish')
  @ApiOperation({ summary: 'Finish a session' })
  async finishSession(
    @Res() res: Response,
    @Req() req: Request,
    @Body() finishSessionDto: FinishSessionDto,
  ) {
    try {
      const response = await this.service.finishSession(
        finishSessionDto.sessionHash,
      );

      return ResponseUtils.successResponse(req, res, response);
    } catch (error) {
      return ResponseUtils.errorResponse(res, 500, error.message);
    }
  }

  @Get('register/:email')
  @ApiOperation({ summary: '' })
  async registerSession(
    @Res() res: Response,
    @Req() req: Request,
    @Param() email: string,
  ) {
    try {
      const response = await this.service.registerSession(email);

      return ResponseUtils.successResponse(req, res, response);
    } catch (error) {
      return ResponseUtils.errorResponse(res, 500, error.message);
    }
  }
}
