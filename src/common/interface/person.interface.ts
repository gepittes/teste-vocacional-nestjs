import { ObjectId } from 'mongodb';

export interface UserCommon {
  _id: ObjectId;
  nome: string;
  email: string;
  typeUser?: TypeUser;
}

export interface User extends UserCommon {
  password: string;
}

export interface Participant extends UserCommon {
  phone: string;
  state: string;
  city: string;
  scholarship: string;
  university: string;
}

export enum TypeUser {
  ADM_USER = 'adm_user',
  PARTICIPANT = 'participant',
}
