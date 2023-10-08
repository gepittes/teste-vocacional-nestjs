import { MongooseResponseQuestionRepository } from '../../../infra/database/repository/response-repository/mongoose-response-question.repository';
import { MongoInMemory } from '../../../infra/memory/mongo/mongo-in-memory.memory';
import { ResponseQuestions } from '../../../app/response-question/interfaces/response-questions.interface';
import {
  Group,
  TypeResponse,
} from '../../../app/question/interfaces/question.interface';

describe(`${MongooseResponseQuestionRepository.name}`, () => {
  let repository: MongooseResponseQuestionRepository;

  let mongoInMemory: MongoInMemory;

  beforeAll(async () => {
    jest.setTimeout(10000);

    mongoInMemory = await MongoInMemory.startServer();

    repository = new MongooseResponseQuestionRepository();
  });

  beforeEach(async () => {
    await mongoInMemory.clearCollections();
  });

  afterAll(async () => {
    await mongoInMemory.shutDown();
  });

  it('should be repository is be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should be create with success a response', async () => {
    const response: Omit<ResponseQuestions, '_id'> = {
      group: Group.GROUP_I,
      questionGroup: 1,
      response: TypeResponse.A,
      sessionHash: '123456789',
    };

    const {
      items: [created],
    } = await repository.registerResponse(response);

    expect(created).toMatchObject(response);
  });

  it('should be return all responses by the same hash', async () => {
    const sessionHash = '12345678900123456789';

    const responsesToCreate: Omit<ResponseQuestions, '_id'>[] = [
      {
        group: Group.GROUP_I,
        questionGroup: 1,
        response: TypeResponse.A,
        sessionHash,
      },
      {
        group: Group.GROUP_II,
        questionGroup: 2,
        response: TypeResponse.B,
        sessionHash,
      },
      {
        group: Group.GROUP_III,
        questionGroup: 3,
        response: TypeResponse.WITHOUT_RESPONSE,
        sessionHash,
      },
      {
        group: Group.GROUP_III,
        questionGroup: 4,
        response: TypeResponse.WITHOUT_RESPONSE,
        sessionHash: '13333344445556677888',
      },
    ];

    await Promise.allSettled(
      responsesToCreate.map((response) => {
        return repository.registerResponse(response);
      }),
    );

    const { items } = await repository.getResponsesBySession(sessionHash);

    items.forEach(({ _id, ...rest }) => {
      expect(
        responsesToCreate.some((response) => response.group === rest.group),
      ).toBeTruthy();

      expect(
        responsesToCreate.some(
          (response) => response.questionGroup === rest.questionGroup,
        ),
      ).toBeTruthy();

      expect(
        responsesToCreate.some(
          (response) => response.response === rest.response,
        ),
      ).toBeTruthy();

      expect(
        responsesToCreate.some(
          (response) => response.sessionHash === rest.sessionHash,
        ),
      ).toBeTruthy();
    });
  });
});
