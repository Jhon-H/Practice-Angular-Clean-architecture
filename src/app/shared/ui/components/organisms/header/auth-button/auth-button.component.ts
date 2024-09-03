import { COMPLETE_ROUTES } from '@/shared/domain/routes';
import { RoleEnum } from '@/shared/domain/types';
import { AuthFacade } from '@/shared/services/auth/auth.facade';
import { selectAuth } from '@/store/auth/auth.selectors';
import { selectUser } from '@/store/user/user.selector';
import { AsyncPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-auth-button',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './auth-button.component.html',
  styleUrl: './auth-button.component.scss',
})
export class AuthButtonComponent {
  private readonly authFacade = inject(AuthFacade);
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  showLoginButton = input.required<boolean>();
  isLoggedIn = this.store.select(selectAuth).pipe(map(auth => auth.isLogged ?? false));
  userRole = this.store.select(selectUser).pipe(map(({ user }) => user?.role ?? null));

  redirectToLogin() {
    this.router.navigate([COMPLETE_ROUTES.Login]);
  }

  redirectToAdmin() {
    this.router.navigate([COMPLETE_ROUTES.Admin]);
  }

  showAdminButton(): Observable<boolean> {
    return this.userRole.pipe(map(role => role === RoleEnum.ADMIN));
  }

  handleSignout() {
    this.authFacade.signOut().subscribe();
  }
}
