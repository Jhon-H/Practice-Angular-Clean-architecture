import { User } from '@/shared/domain/models/user.model';
import { createReducer, on } from '@ngrx/store';
import { userActions } from './user.actions';

export interface UserState {
  user?: User;
}

const initialState: UserState = {};

export const userReducer = createReducer(
  initialState,
  on(userActions.setInfo, (_, info) => ({
    ...info,
  })),
  on(userActions.setUserInfo, (state, userInfo) => ({
    ...state,
    user: { ...userInfo },
  })),
  on(userActions.resetInfo, () => ({
    ...initialState,
  })),
  on(userActions.setRole, (state, newRole) => ({
    ...state,
    role: newRole.role,
  }))
);
