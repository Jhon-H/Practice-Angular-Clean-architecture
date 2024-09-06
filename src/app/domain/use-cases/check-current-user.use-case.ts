import { UseCase } from '@/base/use-case';
import { AuthGateway } from '../gateways/auth.gateway';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root'})
export class CheckUserSessionUseCase implements UseCase<void, boolean> {
  constructor(private authGateway: AuthGateway) {}

  execute(): Observable<boolean> {
    return this.authGateway.checkUserSession();
  }
}
