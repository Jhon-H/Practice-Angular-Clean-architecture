import { Language } from '@/ui/types/language.types';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const uiActions = createActionGroup({
  source: 'UI',
  events: {
    'Update Language': props<{ languaje: Language }>(),
    'Success Updated Language': emptyProps(),
    'Toogle Color Theme': emptyProps(),
  },
});
