import { createFeatureSelector } from '@ngrx/store';
import { UI_KEY } from './ui.key';
import { UiState } from './ui.reducer';

export const selectUi = createFeatureSelector<UiState>(UI_KEY);
