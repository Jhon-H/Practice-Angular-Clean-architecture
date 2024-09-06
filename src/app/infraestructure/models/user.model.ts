export interface UserViewModel {
  name: string;
  email: string;
  picture?: string;
  role: RoleViewModel;
}

export type RoleViewModel = 'ADMIN' | 'USER' | 'UNKNOWN';

export enum RoleEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
  UNKNOWN = 'UNKNOWN',
}
