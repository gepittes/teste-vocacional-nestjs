import { SessionRepository } from '../../../repositories/session/session.repository';
import { UserCommon } from '../../../../common/interface/person.interface';
import { ListResponse } from '../../../../common/interface/requests.interface';
import { Session } from '../../../../app/session/interfaces/session.interface';
import { SessionModel } from '../../schema/session/session.schema';

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
    const session = await SessionModel.create({
      email,
    });

    return { items: [JSON.parse(JSON.stringify(session))] };
  }
}
