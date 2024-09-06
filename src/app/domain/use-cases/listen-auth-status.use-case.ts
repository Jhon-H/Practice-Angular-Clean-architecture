import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '@/base/use-case';
import { AuthGateway } from '../gateways/auth.gateway';

@Injectable({ providedIn: 'root'})
export class ListenAuthStateUseCase implements UseCase<void, boolean> {
  constructor(private _authGateway: AuthGateway) {}

  execute(): Observable<boolean> {
    return this._authGateway.listenToAuthStatus();
  }
}
