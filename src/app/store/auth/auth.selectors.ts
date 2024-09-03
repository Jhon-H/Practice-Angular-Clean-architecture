import { createFeatureSelector } from '@ngrx/store';
import { AUTH_KEY } from './auth.key';
import { AuthState } from './auth.reducer';

// export const selectAuth = (state: AppState) => state.auth;
// export const selectIsLogged = createSelector()

export const selectAuth = createFeatureSelector<AuthState>(AUTH_KEY);
