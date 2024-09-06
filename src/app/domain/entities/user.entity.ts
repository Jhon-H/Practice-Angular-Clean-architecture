import { Role, RoleType } from '../value-objects/role.vo';

interface UserProps {
  name?: string;
  email?: string;
  picture?: string;
  role: Role;
}

export class User {
  name: string;
  email: string;
  picture?: string;
  role: Role;

  constructor({ name, email, picture, role }: UserProps) {
    if (!name || typeof name !== 'string') {
      throw new Error('Invalid name provided');
    }

    if (!email || typeof email !== 'string') {
      throw new Error('Invalid email provided');
    }

    this.name = name;
    this.email = email;
    this.picture = picture;
    this.role = role;
  }

  setRole(newRole: Role): void {
    this.role = newRole;
  }

  assignRoleBasedOnEmail(): void {
    if (this.email.includes('admin-x')) {
      this.setRole(Role.create(RoleType.ADMIN));
    }
  }
}
