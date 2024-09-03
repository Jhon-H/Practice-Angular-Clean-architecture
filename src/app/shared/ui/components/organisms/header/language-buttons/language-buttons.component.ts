import { Language } from '@/shared/ui/types/language.types';
import { uiActions } from '@/store/ui/ui.actions';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { headerLaguageLinks } from '../header.links';

@Component({
  selector: 'app-language-buttons',
  standalone: true,
  imports: [],
  templateUrl: './language-buttons.component.html',
  styleUrl: './language-buttons.component.scss',
})
export class LanguageButtonsComponent {
  private readonly store = inject(Store);
  readonly languajes = headerLaguageLinks;

  changeLangue(languaje: Language) {
    this.store.dispatch(uiActions.updateLanguage({ languaje }));
  }
}
