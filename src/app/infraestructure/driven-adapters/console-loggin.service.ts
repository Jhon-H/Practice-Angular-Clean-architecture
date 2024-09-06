import { Injectable } from '@angular/core';
import { LogginGateway, LogLevel } from '@/domain/gateways/loggin.gateway';

@Injectable()
export class ConsoleLogginService implements LogginGateway {
  log(message: string, level: LogLevel): void {
    console.log(`[${level}] ${message}`);
  }

  error(message: string, errorDetails?: any): void {
    console.log(`[ERROR] ${message} ${errorDetails}`);
  }
}
