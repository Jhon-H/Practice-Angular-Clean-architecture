import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { UseCase } from '@/base/use-case';
import { User } from '../entities/user.entity';
import { AuthGateway } from '../gateways/auth.gateway';
import { Failure, Result, Success } from '@/base/result';
import { BusinessError, BusinessErrorType } from '../helpers/business-errors';
import { InfrastructureError } from '@/infraestructure/helpers/infra-errors';

//! Reducir interfaces repetiddas (aca x2, facade, gateway)
//? Que recibe como parametros ? DTO, Modelo de vista

@Injectable({ providedIn: 'root' })
export class RegisterUserUseCase
  implements
    UseCase<
      {
        username: string;
        password: string;
        email: string;
        picture?: string;
        name: string;
      },
      boolean
    >
{
  constructor(private _authGateway: AuthGateway) {}

  execute(params: {
    username: string;
    password: string;
    email: string;
    picture?: string;
    name: string;
  }): Observable<boolean> {
    console.log('IN regster', this.isValidPassword(params.password), params);
    if (!this.isValidPassword(params.password)) {
      return of(false);
    }

    return this._authGateway.register(params);
  }

  private isValidPassword(password: string): boolean {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber;
  }
}
