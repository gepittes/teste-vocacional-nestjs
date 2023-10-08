import { UserCommon } from '../../../common/interface/person.interface';

export interface Session {
  /**
   * session identification
   */
  sessionHash: string;

  /**
   * User email by session
   */
  email: UserCommon['email'];

  /**
   * when session start
   */
  startSession: Date;

  /**
   * when session finish
   */
  finishSession: Date;
}
