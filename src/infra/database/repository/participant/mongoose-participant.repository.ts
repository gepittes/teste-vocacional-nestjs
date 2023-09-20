import { ParticipantRepository } from '../../../repositories/participant/participant.repository';
import { Participant } from '../../../../common/interface/person.interface';
import {
  ListResponse,
  Paginated,
} from '../../../../common/interface/requests.interface';
import { ParticipantModel } from '../../schema/participant/participant.schema';

export class MongooseParticipantRepository implements ParticipantRepository {
  getAllParticipantPaginatedPerFilter(
    filter: any,
  ): Promise<Paginated<Participant>> {
    return Promise.resolve(undefined);
  }

  getAllParticipants(filter: any): Promise<ListResponse<Participant>> {
    return Promise.resolve(undefined);
  }

  getParticipantById(
    participantId: string,
  ): Promise<ListResponse<Participant>> {
    return Promise.resolve(undefined);
  }

  patchSomeDataParticipant(participant: Partial<Participant>): Promise<void> {
    return Promise.resolve(undefined);
  }

  async registerParticipant(
    participant: Participant,
  ): Promise<ListResponse<Participant>> {
    try {
      const createdParticipant = (await ParticipantModel.create(
        participant,
      )) as Participant;

      return Promise.resolve({ items: [createdParticipant] });
    } catch (error) {
      throw new Error(error);
    }
  }
}
