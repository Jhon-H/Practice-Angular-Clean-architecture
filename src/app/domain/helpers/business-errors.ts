export enum BusinessErrorType {
  PasswordValidationFailed = 'PasswordValidationFailed',
}

export class BusinessError {
  constructor(
    public type: BusinessErrorType,
    public message: string
  ) {}
}
