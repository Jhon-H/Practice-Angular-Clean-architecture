import { inject, Injectable } from '@angular/core';
import { catchError, filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { authActions } from '@/ui/store/auth/auth.actions';
import { userActions } from '@/ui/store/user/user.actions';
import { UserViewModel } from '@/infraestructure/models/user.model';
import { UserMapper } from '@/infraestructure/mappers/user.mapper';
import { LoginUserUseCase } from '@/domain/use-cases/login-user.use-case';
import { RegisterUserUseCase } from '@/domain/use-cases/register-user.use-case';
import { LogoutUserUseCase } from '@/domain/use-cases/logout-user.use-case';
import { CheckUserSessionUseCase } from '@/domain/use-cases/check-current-user.use-case';
import { ListenAuthStateUseCase } from '@/domain/use-cases/listen-auth-status.use-case';
import { GetUserUseCase } from '@/domain/use-cases/get-user.use-case';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly store = inject(Store);
  private readonly userMapper = new UserMapper();
  private readonly loginUserUseCase = inject(LoginUserUseCase);
  private readonly registerUserUseCase = inject(RegisterUserUseCase);
  private readonly logoutUserUseCase = inject(LogoutUserUseCase);
  private readonly checkUserSessionUseCase = inject(CheckUserSessionUseCase);
  private readonly listenAuthStateUseCase = inject(ListenAuthStateUseCase);
  private readonly getUserUseCase = inject(GetUserUseCase);

  login(user: { username: string; password: string }): Observable<boolean> {
    return this.loginUserUseCase.execute(user).pipe(
      tap(user => {
        if (user) {
          this.updateStoreWithNewUser(this.userMapper.mapFrom(user));
        }
      }),
      map(user => !!user),
      catchError(() => of(false))
    );
  }

  register(user: {
    email: string;
    username: string;
    password: string;
    name: string;
    picture?: string;
  }): Observable<boolean> {
    return this.registerUserUseCase.execute(user).pipe(catchError(() => of(false)));
  }

  signOut(): Observable<boolean> {
    return this.logoutUserUseCase.execute().pipe(
      tap(() => this.handleSignOut()),
      catchError(() => of(false))
    );
  }

  checkCurrentUser(): Observable<boolean> {
    return this.checkUserSessionUseCase.execute().pipe(
      switchMap(isAuth => this.handleAuthState(isAuth)),
      catchError(() => of(false))
    );
  }

  listenToAuthStatus(): Observable<boolean> {
    return this.listenAuthStateUseCase.execute().pipe(
      switchMap(isAuth => this.handleAuthState(isAuth)),
      catchError(() => of(false))
    );
  }

  private updateStoreWithNewUser(userInfo: UserViewModel) {
    this.store.dispatch(userActions.setUserInfo(userInfo));
    this.store.dispatch(authActions.signIn());
  }

  getUserInfo(): Observable<UserViewModel | null> {
    return this.getUserUseCase
      .execute()
      .pipe(map(user => (!user ? null : this.userMapper.mapFrom(user))));
  }

  private handleAuthState(isAuth: boolean): Observable<boolean> {
    if (isAuth) {
      this.getUserInfo().pipe(
        filter(user => !!user),
        tap(user => this.store.dispatch(userActions.setUserInfo(user)))
      );
    }

    this.handleSignOut();
    return of(false);
  }

  private handleSignOut() {
    this.store.dispatch(authActions.signOut());
    this.store.dispatch(userActions.resetInfo());
  }
}
