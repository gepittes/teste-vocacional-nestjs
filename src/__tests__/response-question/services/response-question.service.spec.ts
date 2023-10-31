import { ResponseQuestionService } from '@/app/response-question/services/response-question.service';
import { ResponseQuestionRepository } from '@/infra/repositories/response-question/response-question.repository';
import { ResponseQuestions } from '@/app/response-question/interfaces/response-questions.interface';
import {
  Group,
  TypeResponse,
} from '@/app/question/interfaces/question.interface';
import { SessionService } from '@/app/session/services/session.service';
import { ObjectId } from 'mongodb';
import { base64 } from '@/common/utils/hash.util';
import Mocked = jest.Mocked;

describe(`${ResponseQuestionService.name}`, () => {
  let service: ResponseQuestionService;

  let sessionServiceMock: Mocked<Partial<SessionService>>;

  let repository: Mocked<Partial<ResponseQuestionRepository>>;

  beforeAll(() => {
    repository = {
      getResponsesBySession: jest.fn(),
      registerResponse: jest.fn(),
      getResponseBySessionHashAndGroup: jest.fn(),
    };

    sessionServiceMock = {
      registerSession: jest.fn(),
      finishSession: jest.fn(),
    };

    service = new ResponseQuestionService(
      repository as ResponseQuestionRepository,
      /* @TODO: check how change any to sessionService */
      sessionServiceMock as any,
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined service', () => {
    expect(service).toBeDefined();
  });

  it('should be return success when try get all responses by session', async () => {
    await service.getResponsesBySession('hash');

    expect(repository.getResponsesBySession).toBeCalledTimes(1);

    expect(repository.getResponsesBySession).toBeCalledWith('hash');
  });

  it('should be return fail when try get all responses by session with invalid data', async () => {
    await expect(service.getResponsesBySession('')).rejects.toThrowError(
      'sessionHash is a required and cannot be empty',
    );

    await expect(service.getResponsesBySession(123 as any)).resolves.toBe(
      undefined,
    );
  });

  it('should be return success when try register response', async () => {
    const sessionHash = base64();

    const response: Omit<ResponseQuestions, '_id'> = {
      group: Group.GROUP_I,
      questionGroup: 1,
      response: TypeResponse.A,
      sessionHash,
    };

    const created: ResponseQuestions = {
      _id: new ObjectId(),
      group: Group.GROUP_II,
      questionGroup: 2,
      response: TypeResponse.WITHOUT_RESPONSE,
      sessionHash,
    };

    repository.getResponseBySessionHashAndGroup.mockResolvedValue([created]);

    await service.registerResponse(response);

    expect(repository.registerResponse).toBeCalledTimes(1);

    expect(repository.registerResponse).toBeCalledWith(response);
  });

  it('should be not save question when the same question is saved previous', async () => {
    const sessionHash = base64();

    const response: Omit<ResponseQuestions, '_id'> = {
      group: Group.GROUP_I,
      questionGroup: 1,
      response: TypeResponse.A,
      sessionHash,
    };

    const created: ResponseQuestions = {
      _id: new ObjectId(),
      group: Group.GROUP_I,
      questionGroup: 1,
      response: TypeResponse.A,
      sessionHash,
    };

    repository.getResponseBySessionHashAndGroup.mockResolvedValue([created]);

    await service.registerResponse(response);

    expect(repository.registerResponse).not.toBeCalled();
  });

  it('should be return fail when try register response with invalid data', async () => {
    await expect(
      service.registerResponse({
        group: Group.GROUP_I,
        questionGroup: 2,
        response: TypeResponse.B,
        sessionHash: '',
      }),
    ).rejects.toThrowError('sessionHash is a required and cannot be empty');

    await expect(
      service.registerResponse({
        group: Group.GROUP_I,
        questionGroup: 2,
        response: '' as any,
        sessionHash: '1234124',
      }),
    ).rejects.toThrowError('response is a required and cannot be empty');

    await expect(
      service.registerResponse({
        group: Group.GROUP_I,
        questionGroup: '' as any,
        response: TypeResponse.A,
        sessionHash: '1234124',
      }),
    ).rejects.toThrowError('questionGroup is a required and cannot be empty');

    await expect(
      service.registerResponse({
        group: '' as any,
        questionGroup: 2,
        response: TypeResponse.B,
        sessionHash: '',
      }),
    ).rejects.toThrowError('group is a required and cannot be empty');
  });
});
