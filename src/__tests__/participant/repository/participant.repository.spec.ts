import { MongooseParticipantRepository } from '../../../infra/database/repository/participant/mongoose-participant.repository';
import { MongoInMemory } from '../../../infra/memory/mongo/mongo-in-memory.memory';
import { Participant } from '../../../common/interface/person.interface';

describe(`${MongooseParticipantRepository.name}`, () => {
  let mongooseParticipantRepository: MongooseParticipantRepository;

  let mongoInMemory: MongoInMemory;

  beforeAll(async () => {
    jest.setTimeout(10000);

    mongoInMemory = await MongoInMemory.startServer();

    mongooseParticipantRepository = new MongooseParticipantRepository();
  });

  beforeEach(async () => {
    await mongoInMemory.clearCollections();
  });

  afterAll(async () => {
    await mongoInMemory.shutDown();
  });

  it('should be define with successful mongoose participant repository', () => {
    expect(mongooseParticipantRepository).toBeDefined();
  });

  it('should be register a participant', async () => {
    const participant: Participant = {
      city: 'participant.city',
      email: 'participant.email',
      nome: 'participant.nome',
      phone: 'participant.phone',
      scholarship: 'participant.scholarship',
      state: 'participant.state',
      university: 'participant.university',
    };

    const {
      items: [createdParticipant],
    } = await mongooseParticipantRepository.registerParticipant(participant);

    expect(createdParticipant).toHaveProperty('_id');
  });
});
