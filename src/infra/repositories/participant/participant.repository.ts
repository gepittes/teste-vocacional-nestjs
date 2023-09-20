import {
  ListResponse,
  Paginated,
} from '../../../common/interface/requests.interface';
import { Participant } from '../../../common/interface/person.interface';

export interface ParticipantRepository {
  /**
   *
   * @param participantId
   */
  getParticipantById(participantId: string): Promise<ListResponse<Participant>>;

  /**
   *
   * @param filter
   */
  getAllParticipants(filter: any): Promise<ListResponse<Participant>>;

  /**
   *
   * @param filter
   */
  getAllParticipantPaginatedPerFilter(
    filter: any,
  ): Promise<Paginated<Participant>>;

  /**
   *
   * @param participant
   */
  registerParticipant(
    participant: Participant,
  ): Promise<ListResponse<Participant>>;

  /**
   *
   * @param participant
   */
  patchSomeDataParticipant(participant: Partial<Participant>): Promise<void>;
}
