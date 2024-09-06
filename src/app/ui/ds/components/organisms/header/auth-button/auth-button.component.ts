import { AsyncPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { COMPLETE_ROUTES } from '@/ui/helpers/constants/routes';
import { RoleEnum } from '@/infraestructure/models/user.model';
import { AuthFacade } from '@/ui/shared/services/auth.facade';
import { selectAuth } from '@/ui/store/auth/auth.selectors';
import { selectUser } from '@/ui/store/user/user.selector';

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
