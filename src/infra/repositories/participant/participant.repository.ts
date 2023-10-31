import { Filter, Participant } from '@/common/interface/person.interface';

export const PARTICIPANT_REPOSITORY = Symbol('PARTICIPANT_REPOSITORY');
export interface ParticipantRepository {
  /**
   *
   * @param participantId
   */
  getParticipantById(participantId: Participant['_id']): Promise<Participant>;

  /**
   *
   * @param filter
   */
  getAllParticipants(
    filter: Omit<Filter, 'pageSize' | 'pageIndex'>,
  ): Promise<Participant[]>;

  /**
   *
   * @param participant
   */
  registerParticipant(
    participant: Omit<Participant, '_id'>,
  ): Promise<Participant>;
}
