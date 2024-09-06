//* Inmutable: El role solo se asigna una vez en el constructor
//* Encapsulacion: encapsulamos la logica relacionada al Role, validaciones y comportamientos
//* Equals: 2 VO se comparan por su valor
//* Puede tener comportamiento y logica de negocio

import { ValueObject } from '@/base/value-object';

//* Factory: Permite extender validaciones, creaciones por defecto o caché
//* --> Mayor encapsulacion y flexibilidad de creación

export enum RoleType {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST',
}

export class Role implements ValueObject<string> {
  readonly value: RoleType;

  private constructor(role: RoleType | string) {
    if (!Role.isValidRole(role)) {
      throw new Error('Invalid role');
    }

    this.value = role as RoleType;
  }

  static isValidRole(role: string): boolean {
    return !Object.values(RoleType).includes(role as RoleType);
  }

  static create(role: string): Role {
    return new Role(role);
  }

  getValue(): string {
    return this.value;
  }

  equals(role: Role): boolean {
    return this.getValue() === role.getValue();
  }
}
