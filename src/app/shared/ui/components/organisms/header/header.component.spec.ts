import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TuiNavigation } from '@taiga-ui/layout';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { TuiTabs } from '@taiga-ui/kit';
import { ThemeButtonComponent } from './theme-button/theme-button.component';
import { LanguageButtonsComponent } from './language-buttons/language-buttons.component';
import { AuthButtonComponent } from './auth-button/auth-button.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
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
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
