import { createReducer, on } from '@ngrx/store';
import { uiActions } from './ui.actions';
import { Language } from '@/shared/ui/types/language.types';
import { Theme } from '@/shared/ui/types/theme.types';

export interface UiState {
  languaje: Language;
  theme: Theme;
}

const initialState: UiState = {
  languaje: Language.ES,
  theme: Theme.LIGHT,
};

export const uiReducer = createReducer(
  initialState,
  on(uiActions.updateLanguage, (state, newLanguage) => ({
    ...state,
    language: newLanguage,
  })),
  on(uiActions.toogleColorTheme, state => ({
    ...state,
    theme: state.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK,
  }))
);
