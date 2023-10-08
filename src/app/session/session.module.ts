import { Module } from '@nestjs/common';
import { MongooseSessionRepository } from '../../infra/database/repository/session/mongoose-session.repository';
import { SESSION_REPOSITORY } from '../../infra/repositories/session/session.repository';
import { SessionService } from './services/session.service';

@Module({
  imports: [],
  providers: [
    SessionService,
    SessionModule,
    {
      provide: SESSION_REPOSITORY,
      useClass: MongooseSessionRepository,
    },
  ],
  exports: [SessionService],
})
export class SessionModule {}
