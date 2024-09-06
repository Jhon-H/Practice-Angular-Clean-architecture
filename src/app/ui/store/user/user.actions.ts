import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserState } from './user.reducer';
import { RoleViewModel, UserViewModel } from '@/infraestructure/models/user.model';

export const userActions = createActionGroup({
  source: 'User',
  events: {
    'Set info': props<UserState>(),
    'Set user info': props<UserViewModel>(),
    'Set role': props<{ role: RoleViewModel }>(),
    'Reset info': emptyProps(),
  },
});
