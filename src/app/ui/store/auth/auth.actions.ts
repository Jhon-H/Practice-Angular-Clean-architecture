import { createActionGroup, emptyProps } from '@ngrx/store';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    'Sign In': emptyProps(),
    'Sign Out': emptyProps(),
  },
});
