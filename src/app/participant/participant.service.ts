import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  Participant,
  ParticipantSession,
} from '../../common/interface/person.interface';
import {
  PARTICIPANT_REPOSITORY,
  ParticipantRepository,
} from '../../infra/repositories/participant/participant.repository';
import { validateObject } from '../../common/utils/object.utils';
import { SessionService } from '../session/services/session.service';

@Injectable()
export class ParticipantService {
  private logger = new Logger(ParticipantService.name);

  constructor(
    @Inject(PARTICIPANT_REPOSITORY)
    private participantRepository: ParticipantRepository,
    private sessionService: SessionService,
  ) {}

  async getParticipantById(participantId: string): Promise<Participant> {
    try {
      validateObject({ participantId });
      return await this.participantRepository.getParticipantById(participantId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllParticipants(): Promise<Participant[]> {
    return await this.participantRepository.getAllParticipants({});
  }

  async registerParticipant(
    participant: Omit<Participant, '_id' | 'typeUser'>,
  ): Promise<ParticipantSession> {
    try {
      validateObject(participant);
      const session = await this.sessionService.registerSession(
        participant.email,
      );

      const newParticipant =
        await this.participantRepository.registerParticipant(participant);

      return { ...newParticipant, ...session };
    } catch (error) {
      throw new Error(error);
    }
  }
}
