import { Inject, Injectable } from '@nestjs/common';
import { Participant } from '../../common/interface/person.interface';
import {
  ListResponse,
  Paginated,
} from '../../common/interface/requests.interface';
import {
  PARTICIPANT_REPOSITORY,
  ParticipantRepository,
} from '../../infra/repositories/participant/participant.repository';
import { validateObject } from '../../common/utils/object.utils';

@Injectable()
export class ParticipantService {
  constructor(
    @Inject(PARTICIPANT_REPOSITORY)
    private participantRepository: ParticipantRepository,
  ) {}

  async getParticipantById(
    participantId: string,
  ): Promise<ListResponse<Participant>> {
    try {
      validateObject({ participantId });
      return this.participantRepository.getParticipantById(participantId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllParticipants(): Promise<ListResponse<Participant>> {
    return {
      items: [],
    };
  }

  async getAllParticipantPaginatedPerFilter(
    filter: any,
  ): Promise<Paginated<Participant>> {
    return {
      items: [],
      currentPage: 0,
      itemsPerPage: 0,
      totalCount: 0,
      totalPages: 0,
    };
  }

  async registerParticipant(
    participant: Omit<Participant, '_id' | 'typeUser'>,
  ): Promise<ListResponse<Participant>> {
    try {
      validateObject(participant);
      return this.participantRepository.registerParticipant(participant);
    } catch (error) {
      throw new Error(error);
    }
  }

  async patchSomeDataParticipant(): Promise<void> {
    return;
  }
}
