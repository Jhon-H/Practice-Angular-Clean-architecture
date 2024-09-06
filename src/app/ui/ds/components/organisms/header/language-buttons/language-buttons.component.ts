import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { headerLaguageLinks } from '../header.links';
import { Language } from '@/ui/types/language.types';
import { uiActions } from '@/ui/store/ui/ui.actions';

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
