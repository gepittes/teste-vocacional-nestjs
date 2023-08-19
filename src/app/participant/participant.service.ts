import { Injectable } from '@nestjs/common';
import { Participant } from '../../common/interface/person.interface';
import {
    ListResponse,
    Paginated
} from '../../common/interface/requests.interface';

@Injectable()
export class ParticipantService {
    constructor() {
    }

    async getParticipantById( participantId: string ): Promise<Participant> {
        return
    }

    async getAllParticipants(): Promise<ListResponse<Participant>> {
        return {
            items: []
        }
    }

    async getAllParticipantPaginatedPerFilter( filter: any ): Promise<Paginated<Participant>> {
    }

    async registerParticipant(): Promise<Participant> {
        return
    }

    async patchSomeDataParticipant(): Promise<void> {
        return
    }
}