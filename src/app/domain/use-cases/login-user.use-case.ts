import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UseCase } from '@/base/use-case';
import { User } from '../entities/user.entity';
import { AuthGateway } from '../gateways/auth.gateway';

@Injectable({ providedIn: 'root'})
export class LoginUserUseCase
  implements UseCase<{ username: string; password: string }, User | null>
{
  constructor(private _authGateway: AuthGateway) {}

  execute(params: { username: string; password: string }): Observable<User | null> {
    return this._authGateway.login(params).pipe(
      map(user => {
        user?.assignRoleBasedOnEmail();
        return user;
      })
    );
  }
}
