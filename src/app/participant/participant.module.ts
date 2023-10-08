import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { PARTICIPANT_REPOSITORY } from '../../infra/repositories/participant/participant.repository';
import { MongooseParticipantRepository } from '../../infra/database/repository/participant/mongoose-participant.repository';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [SessionModule],
  controllers: [ParticipantController],
  providers: [
    ParticipantService,
    {
      provide: PARTICIPANT_REPOSITORY,
      useClass: MongooseParticipantRepository,
    },
  ],
})
export class ParticipantModule {}
