export interface Mapper<T, K> {
  mapFrom(value: K): T;
  mapTo?(value: T): K;
}
