import { Theme } from '@/shared/ui/types/theme.types';
import { uiActions } from '@/store/ui/ui.actions';
import { selectUi } from '@/store/ui/ui.selector';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

@Component({
  selector: 'app-theme-button',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './theme-button.component.html',
  styles: '',
})
export class ThemeButtonComponent {
  private readonly store = inject(Store);
  readonly Theme = Theme;

  currentTheme = this.store.select(selectUi).pipe(map(ui => ui.theme));

  toogleTheme() {
    this.store.dispatch(uiActions.toogleColorTheme());
  }
}
