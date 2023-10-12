import { ParticipantRepository } from '../../../repositories/participant/participant.repository';
import {
  Filter,
  Participant,
} from '../../../../common/interface/person.interface';
import {
  ListResponse,
  Paginated,
} from '../../../../common/interface/requests.interface';
import { ParticipantModel } from '../../schema/participant/participant.schema';

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
  ): Promise<ListResponse<Participant>> {
    try {
      const filterBuilt = this.buildFilter(filter);

      const participants = await ParticipantModel.find().lean();

      return {
        items: participants,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getParticipantById(
    participantId: string,
  ): Promise<ListResponse<Participant>> {
    try {
      const participant = (await ParticipantModel.findById(
        participantId,
      )) as Participant;

      return {
        items: [participant],
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async registerParticipant(
    participant: Omit<Participant, '_id'>,
  ): Promise<ListResponse<Participant>> {
    try {
      let createdParticipant = (await ParticipantModel.create(
        participant,
      )) as Participant;

      createdParticipant = JSON.parse(JSON.stringify(createdParticipant));

      return { items: [createdParticipant] };
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
