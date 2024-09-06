import { Component, inject, Renderer2 } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { TuiRoot } from '@taiga-ui/core';

import { COMPLETE_ROUTES } from '@/ui/helpers/constants/routes';
import { AuthFacade } from '@/ui/shared/services/auth.facade';
import { RbacService } from '@/ui/shared/services/rbac/rbac.service';
import { selectUi } from '@/ui/store/ui/ui.selector';
import { Theme } from '@/ui/types/theme.types';
import { RoleEnum } from '@/infraestructure/models/user.model';

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
      .listenToAuthStatus()
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
