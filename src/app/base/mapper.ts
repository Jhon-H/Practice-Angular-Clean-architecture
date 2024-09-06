export interface Mapper<I, O> {
  mapTo: (param: O) => I;
  mapFrom?: (param: I) => O;
}
