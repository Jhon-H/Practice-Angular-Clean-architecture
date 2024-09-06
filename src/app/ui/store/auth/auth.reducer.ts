import { createReducer, on } from '@ngrx/store';
import { authActions } from './auth.actions';

export interface AuthState {
  isLogged?: boolean;
  refreshToken?: string;
  authToken?: string;
}

const initialState: AuthState = {};

export const authReducer = createReducer(
  initialState,
  on(authActions.signIn, state => ({ ...state, isLogged: true })),
  on(authActions.signOut, state => ({ ...state, isLogged: false }))
);
