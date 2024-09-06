export abstract class ValueObject<I> {
  abstract readonly value: I;

  static create<T>(_param: T): ValueObject<T> {
    throw new Error('Method not implemented');
  }

  abstract equals(vo: ValueObject<I>): boolean;

  abstract getValue(): I;
}
