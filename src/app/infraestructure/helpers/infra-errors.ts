export enum InfrastructureErrorType {
  NetworkError = 'NetworkError',
  UnknownError = 'UnknownError',
}

export class InfrastructureError {
  constructor(
    public type: InfrastructureErrorType,
    public message: string
  ) {}
}
