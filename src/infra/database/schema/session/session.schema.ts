import mongoose from 'mongoose';
import { Session } from '../../../../app/session/interfaces/session.interface';
import { base64 } from '../../../../common/utils/hash.util';

export const SessionSchema = new mongoose.Schema<Session>({
  email: {
    type: String,
    required: true,
  },
  finishSession: {
    Type: Date,
  },
  startSession: {
    type: Date,
    required: true,
    default: new Date(),
  },
  sessionHash: {
    type: String,
    required: true,
    default: base64(),
  },
});

export const SessionModel: mongoose.Model<Session> = mongoose.model(
  'session',
  SessionSchema,
);
