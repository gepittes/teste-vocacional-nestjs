import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { RegisterParticipantDto } from './dto/register-participant.dto';
import { ParticipantService } from './participant.service';
import { Request, Response } from 'express';
import { ResponseUtils } from '../../infra/reponseUtils/response.utils';
import { dataProcessing } from '../../common/utils/object.utils';

@ApiTags('Participants')
@Controller('participants')
export class ParticipantController {
  constructor(private participantService: ParticipantService) {}

  @Get('')
  @ApiOperation({ summary: 'Return all participant' })
  async getAllParticipants(@Res() res: Response, @Req() req: Request) {
    try {
      const response = await this.participantService.getAllParticipants();

      return ResponseUtils.successResponse(req, res, response);
    } catch (error) {
      return ResponseUtils.errorResponse(res, 404, error.message);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new participant' })
  async registerParticipant(
    @Res() res: Response,
    @Req() req: Request,
    @Body() participantDto: RegisterParticipantDto,
  ) {
    try {
      const response = await this.participantService.registerParticipant(
        dataProcessing(participantDto),
      );

      return ResponseUtils.successResponse(req, res, response);
    } catch (error) {
      return ResponseUtils.errorResponse(res, 500, error.message);
    }
  }
}
