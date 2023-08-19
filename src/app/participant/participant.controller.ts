import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Req,
    Res
} from '@nestjs/common';
import { RegisterParticipantDto } from './dto/register-participant.dto';
import { ParticipantService } from './participant.service';
import { Request, Response } from 'express';
import { ResponseUtils } from '../../infra/reponseUtils/response.utils';

@ApiTags( 'Participants' )
@Controller( 'participants' )
export class ParticipantController {
    constructor( private participantService: ParticipantService ) {
    }

    @Get( '' )
    @ApiOperation( { summary: 'Return all participant' } )
    async getAllParticipants( @Res() res: Response, @Req() req: Request ) {
        try {
            const response = await this.participantService.getAllParticipants()

            return ResponseUtils.successResponse( req, res, response );
        } catch ( error ) {
            return ResponseUtils.errorResponse( res, 404, 'Not found' )
        }
    }

    @Get( ':participantId' )
    @ApiOperation( { summary: 'Return participant by id' } )
    getParticipantById( @Param( 'participantId' ) participantId: string ) {
    }

    @Get( '' )
    @ApiOperation( { summary: 'Return all participants per filter' } )
    getAllParticipantPerFilter() {
    }

    @Get( '' )
    @ApiOperation( { summary: 'Return all participants paginated per filter' } )
    getAllParticipantPaginatedPerFilter() {
    }

    @Post()
    @ApiOperation( { summary: 'Create a new participant' } )
    registerParticipant( @Body() participantDto: RegisterParticipantDto ) {
    }

    @Patch()
    @ApiOperation( { summary: 'Update some information by participant' } )
    patchSomeDataParticipant() {
    }
}