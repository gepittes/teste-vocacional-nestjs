import * as mongoose from 'mongoose';

import { TypeUser, User } from 'src/common/interface/person.interface';

export const UserSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  typeUser: {
    type: String,
    default: TypeUser.ADM_USER,
  },
});

export const UserModel: mongoose.Model<User> = mongoose.model(
  'person',
  UserSchema,
);
