import { ParticipantService } from '../participant.service';
import { Logger } from '@nestjs/common';
import { Participant } from '../../../common/interface/person.interface';

export class ParticipantServiceLogger {
  private className: string = ParticipantService.name;

  private log: Logger = new Logger(this.className);

  participantRequest(participantId: Participant['_id']): string {
    return `Participant requested ${participantId}`;
  }
}
