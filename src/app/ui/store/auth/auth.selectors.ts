import { createFeatureSelector } from '@ngrx/store';
import { AUTH_KEY } from './auth.key';
import { AuthState } from './auth.reducer';

export const selectAuth = createFeatureSelector<AuthState>(AUTH_KEY);
