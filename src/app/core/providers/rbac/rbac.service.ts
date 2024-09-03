import { selectAuth } from '@/store/auth/auth.selectors';
import { selectUser } from '@/store/user/user.selector';
import { inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { first, map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthFacade } from '../auth/auth.facade';
import { Role } from '@/shared/domain/models/role.model';
import { RoleEnum } from '@/shared/domain/types';

@Injectable({
  providedIn: 'root',
})
export class RbacService {
  private readonly store = inject(Store);
  private readonly authFacade = inject(AuthFacade);

  private roles: Role[] = [];
  private currentRole = signal<Role>(RoleEnum.UNKNOWN);

  constructor() {
    this.store
      .select(selectUser)
      .pipe(takeUntilDestroyed())
      .subscribe(user => {
        this.currentRole.set(user.user?.role ?? RoleEnum.UNKNOWN);
      });
  }

  setRoles(roles: Role[]) {
    this.roles = roles;
  }

  validateGranted(allowedRoles: Role[], userRole?: Role) {
    if (!userRole) userRole = this.currentRole();
    if (!userRole) return false;
    if (!this.roles.includes(userRole)) return false;

    return allowedRoles.includes(userRole) ?? false;
  }

  isGranted(allowedRoles: Role[], userRole?: Role): Observable<boolean> {
    return this.store.select(selectAuth).pipe(
      first(),
      switchMap(authState => {
        if (authState.isLogged !== undefined) return of(authState.isLogged);
        return this.authFacade.checkCurrentUser();
      }),
      map(isAuth => this.validateGranted(allowedRoles, userRole))
    );
  }
}
