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
    const participant: Omit<Participant, '_id'> = {
      email: 'participant.email',
      name: 'participant.name',
      phone: 'participant.phone',
    };

    const {
      items: [createdParticipant],
    } = await mongooseParticipantRepository.registerParticipant(participant);

    expect(createdParticipant).toHaveProperty('_id');
  });

  it('should be get a participant by id', async () => {
    const participant: Omit<Participant, '_id'> = {
      email: 'participant.email',
      name: 'participant.name',
      phone: 'participant.phone',
    };

    const {
      items: [createdParticipant],
    } = await mongooseParticipantRepository.registerParticipant(participant);

    const searchedResponse =
      await mongooseParticipantRepository.getParticipantById(
        String(createdParticipant._id),
      );

    const [searchedParticipant] = searchedResponse.items;

    expect(createdParticipant._id).toStrictEqual(searchedParticipant._id);
  });
});
