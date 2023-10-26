import { Inject, Injectable } from '@nestjs/common';
import {
  SESSION_REPOSITORY,
  SessionRepository,
} from '../../../infra/repositories/session/session.repository';
import { UserCommon } from '../../../common/interface/person.interface';
import { Session } from '../interfaces/session.interface';
import { validateObject } from '../../../common/utils/object.utils';

@Injectable()
export class SessionService {
  constructor(
    @Inject(SESSION_REPOSITORY) private repository: SessionRepository,
  ) {}

  private async checkUserHasSession(
    email: UserCommon['email'],
  ): Promise<Session> {
    try {
      validateObject({ email });
      return await this.repository.checkUserHasSession(email);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  finishSession(sessionHash: Session['sessionHash']): Promise<void> {
    try {
      validateObject({ sessionHash });
      return this.repository.finishSession(sessionHash);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async registerSession(email: UserCommon['email']): Promise<Session> {
    try {
      validateObject({ email });

      const existsSession = await this.checkUserHasSession(email);

      if (existsSession) {
        await this.finishSession(existsSession.sessionHash);
        return await this.registerSession(existsSession.email);
      }

      return await this.repository.registerSession(email);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
