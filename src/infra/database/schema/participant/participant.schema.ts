import * as mongoose from 'mongoose';

import { Participant, TypeUser } from 'src/common/interface/person.interface';

export const ParticipantSchema = new mongoose.Schema<Participant>({
  nome: {
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
  city: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  scholarship: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
});

export const ParticipantModel: mongoose.Model<Participant> = mongoose.model(
  'person',
  ParticipantSchema,
);
