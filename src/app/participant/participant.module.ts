import { Module } from '@nestjs/common';
import { ParticipantService } from './services/participant.service';
import { ParticipantController } from './participant.controller';
import { PARTICIPANT_REPOSITORY } from '@/infra/repositories/participant/participant.repository';
import { MongooseParticipantRepository } from '@/infra/database/repository/participant/mongoose-participant.repository';
import { SessionModule } from '../session/session.module';
import { ParticipantServiceLogger } from './logger/participant-service.logger';

@Module({
  imports: [SessionModule],
  controllers: [ParticipantController],
  providers: [
    ParticipantService,
    ParticipantServiceLogger,
    {
      provide: PARTICIPANT_REPOSITORY,
      useClass: MongooseParticipantRepository,
    },
  ],
})
export class ParticipantModule {}
