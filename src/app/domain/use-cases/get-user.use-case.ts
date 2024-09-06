import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '@/base/use-case';
import { User } from '../entities/user.entity';
import { AuthGateway } from '../gateways/auth.gateway';

@Injectable({ providedIn: 'root' })
export class GetUserUseCase implements UseCase<void, User | null> {
  constructor(private _authGateway: AuthGateway) {}

  execute(): Observable<User | null> {
    return this._authGateway.getCurrentUser();
  }
}
