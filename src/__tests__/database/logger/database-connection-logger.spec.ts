import { DatabaseConnectionLogger } from '../../../infra/database/logger/database-connection/database-connection.logger.';
import SpyInstance = jest.SpyInstance;

describe(`${DatabaseConnectionLogger.name}`, () => {
  let service: DatabaseConnectionLogger;

  let debugSpy: SpyInstance;

  let errorSpy: SpyInstance;

  beforeAll(() => {
    service = new DatabaseConnectionLogger();

    debugSpy = jest.spyOn(service['logger'], 'debug');

    errorSpy = jest.spyOn(service['logger'], 'error');
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be logger when success connect to database', () => {
    const mongoUri = 'http://localhost:3001/mongodb';

    service.connected(mongoUri);

    expect(debugSpy).toBeCalledWith(`Connected to mongodb ${mongoUri}`);

    expect(debugSpy).toBeCalledTimes(1);
  });

  it('should be logger when fail connect to database', () => {
    const mongoUri = 'http://localhost:3001/mongodb';

    service.failConnect(mongoUri);

    expect(errorSpy).toBeCalledWith(
      `Failed connecting to database ${mongoUri}`,
    );

    expect(errorSpy).toBeCalledTimes(1);
  });
});
