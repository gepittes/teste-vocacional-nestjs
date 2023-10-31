import { Logger } from '@nestjs/common';
import { MongoConnectionService } from '../../services/database.connection.service';

export class DatabaseConnectionLogger {
  private className: string = MongoConnectionService.name;

  private logger: Logger = new Logger(this.className);

  connected(mongoUriEnvironment: string) {
    this.logger.debug(`Connected to mongodb ${mongoUriEnvironment}`);
  }

  failConnect(mongoUriEnvironment: string) {
    this.logger.error(`Failed connecting to database ${mongoUriEnvironment}`);
  }
}
