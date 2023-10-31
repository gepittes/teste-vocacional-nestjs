import { ParticipantService } from '../participant.service';
import { Logger } from '@nestjs/common';
import {
  Participant,
  ParticipantSession,
} from '../../../common/interface/person.interface';

export class ParticipantServiceLogger {
  private className: string = ParticipantService.name;

  private logger: Logger = new Logger(this.className);

  participantRequest(participantId: Participant['_id']) {
    this.logger.verbose(`Participant requested ${participantId}`);
  }

  getAllParticipants(participants: Participant[]) {
    this.logger.verbose(
      `All participants requested without pained, total returned ${participants.length}`,
    );
  }

  registerParticipant(
    participant: Pick<ParticipantSession, 'email' | 'sessionHash'>,
  ) {
    this.logger.verbose(
      `New participant registered Email: ${participant.email}, Session: ${participant.sessionHash}`,
    );
  }

  generalError(messageError: string) {
    this.logger.error(messageError);
  }
}
