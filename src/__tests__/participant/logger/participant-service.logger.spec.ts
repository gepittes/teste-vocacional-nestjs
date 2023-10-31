import { ParticipantServiceLogger } from '@/app/participant/logger/participant-service.logger';
import {
  Participant,
  ParticipantSession,
} from '@/common/interface/person.interface';
import { ObjectId } from 'mongodb';
import { base64 } from '@/common/utils/hash.util';
import SpyInstance = jest.SpyInstance;

describe(`${ParticipantServiceLogger.name}`, () => {
  let service: ParticipantServiceLogger;

  let verboseSpy: SpyInstance;

  let errorSpy: SpyInstance;

  beforeAll(() => {
    service = new ParticipantServiceLogger();

    verboseSpy = jest.spyOn(service['logger'], 'verbose');

    errorSpy = jest.spyOn(service['logger'], 'error');
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be send logger when request participant by id', () => {
    const participantId: Participant['_id'] = new ObjectId();

    service.participantRequest(participantId);

    expect(verboseSpy).toHaveBeenCalledTimes(1);

    expect(verboseSpy).toHaveBeenCalledWith(
      `Participant requested ${participantId}`,
    );
  });

  it('should be send logger when request all participants', () => {
    const participants: any[] = [1, 2, 3, 4, 5, 6, 7];

    service.getAllParticipants(participants);

    expect(verboseSpy).toHaveBeenCalledTimes(1);

    expect(verboseSpy).toHaveBeenCalledWith(
      `All participants requested without pained, total returned ${participants.length}`,
    );
  });

  it('should be send logger when request register participant', () => {
    const participant: Pick<ParticipantSession, 'email' | 'sessionHash'> = {
      email: 'this_is_email@test.com',
      sessionHash: base64(),
    };

    service.registerParticipant(participant);

    expect(verboseSpy).toBeCalledWith(
      `New participant registered Email: ${participant.email}, Session: ${participant.sessionHash}`,
    );

    expect(verboseSpy).toBeCalledTimes(1);
  });

  it('should be send error logger when throw any error', () => {
    const errorMessage = 'OMG a bug is found, run for your lives';

    service.generalError(errorMessage);

    expect(errorSpy).toBeCalledWith(errorMessage);

    expect(errorSpy).toBeCalledTimes(1);
  });
});
