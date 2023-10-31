import { Inject, Injectable } from '@nestjs/common';
import {
  Participant,
  ParticipantSession,
} from '@/common/interface/person.interface';
import {
  PARTICIPANT_REPOSITORY,
  ParticipantRepository,
} from '@/infra/repositories/participant/participant.repository';
import { validateObject } from '@/common/utils/object.utils';
import { SessionService } from '../../session/services/session.service';
import { ParticipantServiceLogger } from '../logger/participant-service.logger';

@Injectable()
export class ParticipantService {
  constructor(
    @Inject(PARTICIPANT_REPOSITORY)
    private participantRepository: ParticipantRepository,
    private sessionService: SessionService,
    private serviceLogger: ParticipantServiceLogger,
  ) {}

  async getParticipantById(
    participantId: Participant['_id'],
  ): Promise<Participant> {
    try {
      validateObject({ participantId });
      const participant = await this.participantRepository.getParticipantById(
        participantId,
      );

      this.serviceLogger.participantRequest(participantId);

      return participant;
    } catch (error) {
      this.serviceLogger.generalError(error.message);
      throw new Error(error.message);
    }
  }

  async getAllParticipants(): Promise<Participant[]> {
    try {
      const participants = await this.participantRepository.getAllParticipants(
        {},
      );

      this.serviceLogger.getAllParticipants(participants);

      return participants;
    } catch (error) {
      this.serviceLogger.generalError(error.message);

      throw new Error(error.message);
    }
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

      const participantSession: ParticipantSession = {
        ...newParticipant,
        ...session,
      };

      this.serviceLogger.registerParticipant(participantSession);

      return participantSession;
    } catch (error) {
      this.serviceLogger.generalError(error.message);

      throw new Error(error);
    }
  }
}
