import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';

@Module( {
    imports: [],
    controllers: [ParticipantController],
    providers: [ParticipantService]
} )
export class ParticipantModule {
}