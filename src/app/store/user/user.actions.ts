import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserState } from './user.reducer';
import { Role } from '@/shared/domain/models/role.model';
import { User } from '@/shared/domain/models/user.model';

export const userActions = createActionGroup({
  source: 'User',
  events: {
    'Set info': props<UserState>(),
    'Set user info': props<User>(),
    'Set role': props<{ role: Role }>(),
    'Reset info': emptyProps(),
  },
});
