import { RoleEnum } from '@/shared/domain/types';
import {
  signIn as cognitoSignIn,
  signOut as cognitoSignOut,
  signUp as cognitoSignUp,
  fetchUserAttributes,
  getCurrentUser as getCurrentUserCognito,
} from 'aws-amplify/auth';
import { BehaviorSubject, catchError, filter, from, map, Observable, of, tap } from 'rxjs';
import { AuthUser, NewAuthUser } from './auth.interface';
import { Amplify } from 'aws-amplify';
import { environment } from '../../../../environments/environment';
import { Hub } from 'aws-amplify/utils';
import { FetchUserAttributesMapper } from '@/shared/domain/mappers/user.mapper';
import { User } from '@/shared/domain/models/user.model';
import { Injectable, OnDestroy } from '@angular/core';
import { AuthGateway } from './auth.gateway';

@Injectable()
export class CognitoAuthService implements AuthGateway, OnDestroy {
  private readonly hubListenerCancel;
  private readonly authListener$ = new BehaviorSubject<string | undefined>(undefined);

  constructor() {
    Amplify.configure({
      Auth: {
        Cognito: environment.cognito,
      },
    });

    this.hubListenerCancel = Hub.listen('auth', ({ payload }) => {
      this.authListener$.next(payload.event);
    });
  }

  ngOnDestroy(): void {
    this.hubListenerCancel();
  }

  signIn(user: AuthUser): Observable<boolean> {
    return from(cognitoSignIn({ ...user })).pipe(map(value => value.isSignedIn));
  }

  sigUp({ username, password, ...rest }: NewAuthUser): Observable<boolean> {
    return from(
      cognitoSignUp({
        username,
        password,
        options: {
          userAttributes: {
            ...rest,
          },
        },
      })
    ).pipe(map(value => value.isSignUpComplete));
  }

  signOut(): Observable<void> {
    return from(cognitoSignOut());
  }

  getCurrentUser(): Observable<User> {
    return from(fetchUserAttributes()).pipe(
      map(data =>
        new FetchUserAttributesMapper().mapFrom({
          ...data,
          role: data.email?.includes('admin-x') ? RoleEnum.ADMIN : RoleEnum.USER,
        })
      )
    );
  }

  isUserSignedIn(): Observable<boolean> {
    return this.authListener$.asObservable().pipe(
      filter(event => event !== undefined),
      map(event => (event === 'signedOut' ? false : true))
    );
  }

  checkUserSession(): Observable<boolean> {
    return from(getCurrentUserCognito()).pipe(
      map(val => !!val.userId),
      catchError(() => of(false))
    );
  }
}
