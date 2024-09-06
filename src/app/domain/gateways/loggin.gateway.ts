export abstract class LogginGateway {
  abstract log(message: string, level: LogLevel): void;
  abstract error(message: string, errorDetails?: any): void;
}

export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}
