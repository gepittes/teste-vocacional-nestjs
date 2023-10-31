import { UserCommon } from '@/common/interface/person.interface';
import { Session } from '@/app/session/interfaces/session.interface';

export const SESSION_REPOSITORY = Symbol('SESSION_REPOSITORY');

export interface SessionRepository {
  /**
   * register a new session to user
   * @param email
   */
  registerSession(email: UserCommon['email']): Promise<Session>;

  /**
   * check if user has opened a session
   * @param email
   */
  checkUserHasSession(email: UserCommon['email']): Promise<Session>;

  /**
   * finish a user session
   * @param sessionHash
   */
  finishSession(sessionHash: Session['sessionHash']): Promise<void>;

  /**
   * @param sessionHash
   */
  checkSessionExists(sessionHash: Session['sessionHash']): Promise<Session>;
}
