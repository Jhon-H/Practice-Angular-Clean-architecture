export type Result<T, E> = Success<T> | Failure<E>;

export class Success<T> {
  constructor(public value: T) {}
}

export class Failure<E> {
  constructor(public error: E) {}
}
