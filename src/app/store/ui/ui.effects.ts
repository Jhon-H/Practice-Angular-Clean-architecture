import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { uiActions } from './ui.actions';
import { filter, map, tap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

export const changeLangujeEffect = createEffect(
  (actions$ = inject(Actions), translateService = inject(TranslateService)) => {
    return actions$.pipe(
      ofType(uiActions.updateLanguage),
      filter(action => action.languaje !== translateService.currentLang),
      tap(action => {
        translateService.use(action.languaje);
      }),
      map(() => uiActions.successUpdatedLanguage())
    );
  },
  { functional: true }
);
