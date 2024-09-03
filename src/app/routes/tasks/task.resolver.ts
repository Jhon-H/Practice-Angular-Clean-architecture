import { ResolveFn } from '@angular/router';
import { delay, of } from 'rxjs';

export const taskResolver: ResolveFn<{ data: number }[]> = (route, state) => {
  return of([{ data: 1 }, { data: 2 }, { data: 3 }]).pipe(delay(1000));
};
