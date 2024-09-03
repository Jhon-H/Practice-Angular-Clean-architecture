import { createFeatureSelector } from '@ngrx/store';
import { USER_KEY } from './user.key';
import { UserState } from './user.reducer';

export const selectUser = createFeatureSelector<UserState>(USER_KEY);
