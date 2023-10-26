import { ParticipantRepository } from '../../../repositories/participant/participant.repository';
import {
  Filter,
  Participant,
} from '../../../../common/interface/person.interface';
import { Paginated } from '../../../../common/interface/requests.interface';
import { ParticipantModel } from '../../schema/participant/participant.schema';
import { convertToJson } from '../../mongoose-utils/conervertToJson.util';

export class MongooseParticipantRepository implements ParticipantRepository {
  async getAllParticipantPaginatedPerFilter(
    filter: Filter,
  ): Promise<Paginated<Participant>> {
    try {
      const filterBuilt = this.buildFilter(filter);

      const participants = (await ParticipantModel.find(
        filterBuilt,
      )) as Participant[];

      const participantsCounter = await ParticipantModel.countDocuments({});

      return {
        items: participants,
        currentPage: filter.pageIndex,
        itemsPerPage: filter.pageSize,
        totalCount: participantsCounter,
        totalPages: 0,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllParticipants(
    filter: Omit<Filter, 'pageSize' | 'pageIndex'>,
  ): Promise<Participant[]> {
    try {
      const filterBuilt = this.buildFilter(filter);

      const participants = await ParticipantModel.find();

      return convertToJson<Participant[]>(participants);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getParticipantById(participantId: string): Promise<Participant> {
    try {
      const participant = await ParticipantModel.findById(participantId);

      return convertToJson<Participant>(participant);
    } catch (error) {
      throw new Error(error);
    }
  }

  async registerParticipant(
    participant: Omit<Participant, '_id'>,
  ): Promise<Participant> {
    try {
      const registeredParticipant = await ParticipantModel.create(participant);

      return convertToJson<Participant>(registeredParticipant);
    } catch (error) {
      throw new Error(error);
    }
  }

  private buildFilter(
    filter: Omit<Filter, 'pageSize' | 'pageIndex'>,
  ): Omit<Filter, 'pageSize' | 'pageIndex'> {
    const newFilter: any = {};

    if ('word' in filter) {
    }

    return;
  }
}
