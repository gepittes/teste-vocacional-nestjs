import { SessionRepository } from '../../../repositories/session/session.repository';
import { UserCommon } from '../../../../common/interface/person.interface';
import { ListResponse } from '../../../../common/interface/requests.interface';
import { Session } from '../../../../app/session/interfaces/session.interface';
import { SessionModel } from '../../schema/session/session.schema';
import { base64 } from '../../../../common/utils/hash.util';

export class MongooseSessionRepository implements SessionRepository {
  async checkUserHasSession(
    email: UserCommon['email'],
  ): Promise<ListResponse<Session>> {
    let session: any = await SessionModel.findOne({
      email,
      finishSession: { $exists: false },
    });

    session = JSON.parse(JSON.stringify(session));

    return { items: [session] };
  }

  async finishSession(sessionHash: Session['sessionHash']): Promise<void> {
    await SessionModel.findOneAndUpdate(
      { sessionHash },
      { finishSession: new Date() },
    );
  }

  async registerSession(
    email: UserCommon['email'],
  ): Promise<ListResponse<Session>> {
    const check = async (): Promise<string> => {
      const sessionHash = base64();

      const alreadyExists = await this.checkSessionExists(sessionHash);

      if (!!alreadyExists) await check();

      return sessionHash;
    };

    const sessionHash = await check();

    const session = await SessionModel.create({
      email,
      sessionHash,
    });

    console.log({ session });

    return { items: [JSON.parse(JSON.stringify(session))] };
  }

  async checkSessionExists(
    sessionHash: Session['sessionHash'],
  ): Promise<Session> {
    const session = await SessionModel.findOne({ sessionHash });

    return JSON.parse(JSON.stringify(session));
  }
}
