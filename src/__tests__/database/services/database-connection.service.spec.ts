import { MongoConnectionService } from '../../../infra/database/services/database.connection.service';
import { DatabaseConnectionLogger } from '../../../infra/database/logger/database-connection/database-connection.logger.';
import mongoose from 'mongoose';
import Mocked = jest.Mocked;

describe(`${MongoConnectionService.name}`, () => {
  let service: MongoConnectionService;

  let loggerMock: Mocked<Partial<DatabaseConnectionLogger>>;

  beforeAll(() => {
    loggerMock = {
      failConnect: jest.fn(),
      connected: jest.fn(),
    };

    service = new MongoConnectionService(loggerMock as any);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined service', () => {
    expect(service).toBeDefined();
  });

  it('should be connect with success by mongoose', async () => {
    const mongooseConnectMock = jest.spyOn(mongoose, 'connect');
    mongooseConnectMock.mockImplementationOnce(() => {
      return Promise.resolve() as any;
    });

    await service.connect();

    expect(loggerMock.failConnect).not.toHaveBeenCalled();
  });

  it('should be connect with fail by mongoose', async () => {
    const error = new Error('connection error');

    const mongooseConnectMock = jest.spyOn(mongoose, 'connect');
    mongooseConnectMock.mockRejectedValue(error);

    await service.connect();

    expect(loggerMock.failConnect).toBeCalled();
  });
});
