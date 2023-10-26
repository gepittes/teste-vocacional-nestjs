import { ParticipantService } from '../../../app/participant/participant.service';
import { ParticipantRepository } from '../../../infra/repositories/participant/participant.repository';
import { Participant } from '../../../common/interface/person.interface';
import { SessionService } from '../../../app/session/services/session.service';
import { Session } from '../../../app/session/interfaces/session.interface';
import { base64 } from '../../../common/utils/hash.util';
import Mocked = jest.Mocked;

describe(`${ParticipantService.name}`, () => {
  let service: ParticipantService;

  let sessionService: Mocked<Partial<SessionService>>;

  let participantRepositoryMock: Mocked<Partial<ParticipantRepository>>;

  beforeAll(() => {
    participantRepositoryMock = {
      getParticipantById: jest.fn(),
      registerParticipant: jest.fn(),
    };

    sessionService = {
      finishSession: jest.fn(),
      registerSession: jest.fn(),
    };

    service = new ParticipantService(
      participantRepositoryMock as ParticipantRepository,
      /* @TODO: check how change any to sessionService */
      sessionService as any,
    );
  });

  it(`should be defined ${ParticipantService.name}`, () => {
    expect(service).toBeDefined();
  });

  it('should be call with success get participant by id', async () => {
    await service.getParticipantById('participantId');

    expect(participantRepositoryMock.getParticipantById).toBeCalledTimes(1);

    expect(participantRepositoryMock.getParticipantById).toBeCalledWith(
      'participantId',
    );
  });

  it('should be call with fail when try get participant by id with invalid data', async () => {
    await expect(service.getParticipantById('')).rejects.toThrowError(
      'participantId is a required and cannot be empty',
    );
  });

  it('should be call with success register participant', async () => {
    const participant: Omit<Participant, '_id'> = {
      email: 'participant.email',
      name: 'participant.name',
      phone: 'participant.phone',
    };

    const session: Session = {
      email: 'participant.email',
      finishSession: new Date(),
      sessionHash: base64(),
      startSession: new Date(),
    };

    sessionService.registerSession.mockResolvedValue(session);

    await service.registerParticipant(participant);

    expect(participantRepositoryMock.registerParticipant).toHaveBeenCalledTimes(
      1,
    );

    expect(participantRepositoryMock.registerParticipant).toHaveBeenCalledWith(
      participant,
    );
  });

  it('should be call with fail when try register participant with invalid data', async () => {
    await expect(
      service.registerParticipant({
        email: '',
        name: 'participant.nome',
        phone: 'participant.phone',
      }),
    ).rejects.toThrowError('email is a required and cannot be empty');

    await expect(
      service.registerParticipant({
        email: 'participant.email',
        name: '',
        phone: 'participant.phone',
      }),
    ).rejects.toThrowError('name is a required and cannot be empty');

    await expect(
      service.registerParticipant({
        email: 'participant.email',
        name: 'participant.nome',
        phone: '',
      }),
    ).rejects.toThrowError('phone is a required and cannot be empty');
  });
});
