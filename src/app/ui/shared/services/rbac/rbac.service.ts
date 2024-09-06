import { inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { first, map, Observable, of, switchMap } from 'rxjs';
import { AuthFacade } from '@/ui/shared/services/auth.facade';
import { RoleViewModel, RoleEnum } from '@/infraestructure/models/user.model';
import { selectUser } from '@/ui/store/user/user.selector';
import { selectAuth } from '@/ui/store/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class RbacService {
  private readonly store = inject(Store);
  private readonly authFacade = inject(AuthFacade);

  private roles: RoleViewModel[] = [];
  private currentRole = signal<RoleViewModel>(RoleEnum.UNKNOWN);

  constructor() {
    this.store
      .select(selectUser)
      .pipe(takeUntilDestroyed())
      .subscribe(user => {
        this.currentRole.set(user.user?.role ?? RoleEnum.UNKNOWN);
      });
  }

  setRoles(roles: RoleViewModel[]) {
    this.roles = roles;
  }

  validateGranted(allowedRoles: RoleViewModel[], userRole?: RoleViewModel) {
    if (!userRole) userRole = this.currentRole();
    if (!userRole) return false;
    if (!this.roles.includes(userRole)) return false;

    return allowedRoles.includes(userRole) ?? false;
  }

  isGranted(allowedRoles: RoleViewModel[], userRole?: RoleViewModel): Observable<boolean> {
    return this.store.select(selectAuth).pipe(
      first(),
      switchMap(authState => {
        if (authState.isLogged !== undefined) return of(authState.isLogged);
        return this.authFacade.checkCurrentUser();
      }),
      map(() => this.validateGranted(allowedRoles, userRole))
    );
  }
}
