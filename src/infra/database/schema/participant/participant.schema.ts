import * as mongoose from 'mongoose';
import {
  Participant,
  TypeUser,
} from '../../../../common/interface/person.interface';

export const ParticipantSchema = new mongoose.Schema<Participant>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  typeUser: {
    type: String,
    default: TypeUser.PARTICIPANT,
  },
  phone: {
    type: String,
    required: true,
  },
});

export const ParticipantModel: mongoose.Model<Participant> = mongoose.model(
  'person',
  ParticipantSchema,
);
