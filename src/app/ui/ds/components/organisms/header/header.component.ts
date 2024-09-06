import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { TuiTabs } from '@taiga-ui/kit';
import { TuiNavigation } from '@taiga-ui/layout';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { headerLinks } from './header.links';
import { LanguageButtonsComponent } from './language-buttons/language-buttons.component';
import { ThemeButtonComponent } from './theme-button/theme-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    TuiNavigation,
    TuiIcon,
    TuiTabs,
    TuiButton,
    RouterLinkActive,
    ThemeButtonComponent,
    LanguageButtonsComponent,
    AuthButtonComponent,
  ],
  templateUrl: './header.component.html',
  styles: '',
})
export class HeaderComponent {
  readonly headerLinks = headerLinks;

  showLoginButton = input.required<boolean>();
}
