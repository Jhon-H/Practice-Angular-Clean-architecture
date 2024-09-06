import { createReducer, on } from '@ngrx/store';
import { UserViewModel } from '@/infraestructure/models/user.model';
import { userActions } from './user.actions';

export interface UserState {
  user?: UserViewModel;
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
