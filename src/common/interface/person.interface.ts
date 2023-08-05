export interface UserCommon {
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
  scholarity: string;
  university: string;
}

export enum TypeUser {
  ADM_USER = 'adm_user',
  PARTICIPANT = 'participant',
}
