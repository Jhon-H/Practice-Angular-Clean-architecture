// // import { Injectable } from '@angular/core';
// // import { map, Observable, of } from 'rxjs';
// // import { UseCase } from '@/base/use-case';
// // import { User } from '../entities/user.entity';
// // import { AuthGateway } from '../gateways/auth.gateway';
// // import { Failure, Result, Success } from '@/base/result';
// // import { BusinessError, BusinessErrorType } from '../helpers/business-errors';
// // import { InfrastructureError } from '@/infraestructure/helpers/infra-errors';

// // //! Reducir interfaces repetiddas (aca x2, facade, gateway)
// // //? Que recibe como parametros ? DTO, Modelo de vista

// @Injectable({ providedIn: 'root' })
// export class RegisterUserUseCase
//   implements
//     UseCase<
//       {
//         username: string;
//         password: string;
//         email: string;
//         picture?: string;
//         name: string;
//       },
//       Result<User, InfrastructureError | BusinessError>
//     >
// {
//   constructor(private _authGateway: AuthGateway) {}

//   execute(params: {
//     username: string;
//     password: string;
//     email: string;
//     picture?: string;
//     name: string;
//   }): Observable<Result<User, unknown>> {
//     if (!this.isValidPassword(params.password)) {
//       return of(
//         new Failure(
//           new BusinessError(BusinessErrorType.PasswordValidationFailed, 'Invalid password')
//         )
//       );
//     }

//     return this._authGateway.register(params).pipe(map(user => new Success(user)));
//   }

//   private isValidPassword(password: string): boolean {
//     const minLength = 8;
//     const hasUpperCase = /[A-Z]/.test(password);
//     const hasLowerCase = /[a-z]/.test(password);
//     const hasNumber = /\d/.test(password);

//     return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber;
//   }
// }
