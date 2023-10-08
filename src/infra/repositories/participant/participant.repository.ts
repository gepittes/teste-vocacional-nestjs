import { ListResponse } from '../../../common/interface/requests.interface';
import {
  Filter,
  Participant,
} from '../../../common/interface/person.interface';

export const PARTICIPANT_REPOSITORY = Symbol('PARTICIPANT_REPOSITORY');
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
  getAllParticipants(
    filter: Omit<Filter, 'pageSize' | 'pageIndex'>,
  ): Promise<ListResponse<Participant>>;

  /**
   *
   * @param participant
   */
  registerParticipant(
    participant: Omit<Participant, '_id'>,
  ): Promise<ListResponse<Participant>>;
}
