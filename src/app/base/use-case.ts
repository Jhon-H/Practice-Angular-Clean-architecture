import { Observable } from "rxjs";

export interface UseCase<I, O> {
  execute(param: I): Observable<O>; //! Acoplamiento con RXJS
}
