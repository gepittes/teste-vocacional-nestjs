import { ObjectId } from 'mongodb';
import { PaginatedRequest } from './requests.interface';

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
  /* @TODO: check is necessary this information */
  // state: string;
  // city: string;
  // scholarship: string;
  // university: string;
}

export enum TypeUser {
  ADM_USER = 'adm',
  PARTICIPANT = 'participant',
}

export interface Filter extends PaginatedRequest {
  word?: string;

  typeUser?: TypeUser;

  /* @TODO:@ case participant information is necessary implements rest filter  */
  // state?: string;
  // city?: string;
  // scholarship?: string;
  // university?: string;
}
