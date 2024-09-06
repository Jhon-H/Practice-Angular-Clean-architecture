import { LogginGateway } from '@/domain/gateways/loggin.gateway';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private logginGateway: LogginGateway) {}

  handleError(error: any): void {
    this.logginGateway.error(error);
  }
}
