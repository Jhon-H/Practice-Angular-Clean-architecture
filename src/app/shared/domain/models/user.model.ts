import { Role } from './role.model';

export interface User {
  name: string;
  email: string;
  picture: string;
  role: Role;
}
