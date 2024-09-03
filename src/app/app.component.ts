import { TuiRoot } from '@taiga-ui/core';
import { Component, inject, Renderer2 } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { COMPLETE_ROUTES } from '@/shared/domain/routes';
import { selectUi } from '@/store/ui/ui.selector';
import { RbacService } from '@/shared/services/rbac/rbac.service';
import { AuthFacade } from '@/shared/services/auth/auth.facade';
import { RoleEnum } from './shared/domain/types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Theme } from './shared/ui/types/theme.types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TuiRoot, TuiRoot],
  templateUrl: './app.component.html',
  styles: ``,
})
export class AppComponent {
  private readonly authFacade = inject(AuthFacade);
  private readonly rbacService = inject(RbacService);
  private readonly renderer = inject(Renderer2);
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  constructor() {
    this.rbacService.setRoles([RoleEnum.ADMIN, RoleEnum.USER, RoleEnum.UNKNOWN]);

    this.authFacade.checkCurrentUser().pipe(takeUntilDestroyed()).subscribe();

    this.authFacade
      .isUserSignedIn()
      .pipe(takeUntilDestroyed())
      .subscribe(isAuth => {
        if (!isAuth) this.router.navigate([COMPLETE_ROUTES.Login], { replaceUrl: true });
      });

    this.store
      .select(selectUi)
      .pipe(takeUntilDestroyed())
      .subscribe(uiState => {
        if (uiState.theme === Theme.DARK) {
          this.renderer.addClass(document.body, Theme.DARK);
          this.renderer.removeClass(document.body, Theme.LIGHT);
        } else {
          this.renderer.addClass(document.body, Theme.LIGHT);
          this.renderer.removeClass(document.body, Theme.DARK);
        }
      });
  }
}
