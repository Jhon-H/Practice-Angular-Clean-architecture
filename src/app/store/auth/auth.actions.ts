import { createActionGroup, emptyProps, props } from '@ngrx/store';

/*
export const login = createAction('[Auth] Login Usser');
export const closeSession = createAction('[Auth] Close Session');
*/

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    'Sign In': emptyProps(),
    'Sign Out': emptyProps(),
  },
});
