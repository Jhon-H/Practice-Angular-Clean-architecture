import { authActions } from '@/store/auth/auth.actions';
import { userActions } from '@/store/user/user.actions';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, first, map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthUser } from './auth.interface';
import { AuthGateway } from './auth.gateway';
import { User } from '@/shared/domain/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  private readonly authGateway = inject(AuthGateway);
  private readonly store = inject(Store);

  theme = 'a';

  login(user: AuthUser): Observable<boolean> {
    return this.authGateway.signIn(user).pipe(
      first(),
      switchMap(isSuccessLogin => (isSuccessLogin ? this.getUserInfo() : of(false))),
      catchError(() => of(false))
    );
  }

  getUserInfo(): Observable<boolean> {
    return this.authGateway.getCurrentUser().pipe(
      tap(userInfo => {
        this.setUserInfo(userInfo);
        this.store.dispatch(authActions.signIn());
      }),
      map(() => true),
      catchError(() => of(false))
    );
  }

  checkCurrentUser(): Observable<boolean> {
    return this.authGateway.checkUserSession().pipe(
      // ! OJO: switchMap(this.handleAuthState) hace perder el contexto de THIS.
      switchMap(isAuth => this.handleAuthState(isAuth)),
      catchError(error => of(false))
    );
  }

  isUserSignedIn(): Observable<boolean> {
    return this.authGateway.isUserSignedIn().pipe(
      switchMap(isAuth => this.handleAuthState(isAuth)),
      catchError(() => of(false))
    );
  }

  signOut(): Observable<void> {
    return this.authGateway.signOut().pipe(
      first(),
      tap(() => this.handleSignOut()),
      catchError(() => of())
    );
  }

  private setUserInfo = (userInfo: User) => {
    this.store.dispatch(userActions.setUserInfo(userInfo));
  };

  private handleAuthState(isAuth: boolean): Observable<boolean> {
    if (isAuth) return this.getUserInfo();

    this.handleSignOut();
    return of(false);
  }

  private handleSignOut() {
    this.store.dispatch(authActions.signOut());
    this.store.dispatch(userActions.resetInfo());
  }
}
