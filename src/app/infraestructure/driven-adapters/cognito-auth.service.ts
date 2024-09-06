import { Injectable, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject, catchError, filter, from, map, Observable, of, switchMap } from 'rxjs';

import { Amplify } from 'aws-amplify';
import { Hub } from 'aws-amplify/utils';
import {
  signIn as cognitoSignIn,
  signOut as cognitoSignOut,
  signUp as cognitoSignUp,
  fetchUserAttributes,
  getCurrentUser as getCurrentUserCognito,
} from 'aws-amplify/auth';

import { User } from '@/domain/entities/user.entity';
import { AuthGateway } from '@/domain/gateways/auth.gateway';
import { UserToFetchUserAttributesMapper } from '@/infraestructure/mappers/user-to-fetch-user-attributes.mapper';
import { environment } from '@/environments/environment';

@Injectable()
export class CognitoAuthService implements AuthGateway, OnDestroy {
  private readonly hubListenerCancel;
  private readonly userMapper = new UserToFetchUserAttributesMapper();
  private readonly authListener$ = new BehaviorSubject<string | undefined>(undefined);

  constructor() {
    Amplify.configure({ Auth: { Cognito: environment.cognito } });

    this.hubListenerCancel = Hub.listen('auth', ({ payload }) => {
      this.authListener$.next(payload.event);
    });
  }

  ngOnDestroy(): void {
    this.hubListenerCancel();
  }

  login(params: { username: string; password: string }): Observable<User | null> {
    return from(cognitoSignIn({ ...params })).pipe(
      switchMap(() => this.getCurrentUser()),
      catchError(() => of(null))
    );
  }

  register(params: {
    username: string;
    password: string;
    email: string;
    picture?: string;
    name: string;
  }): Observable<boolean> {
    return from(
      cognitoSignUp({
        username: params.username,
        password: params.password,
        options: {
          userAttributes: {
            email: params.email,
            picture: params.picture,
            name: params.name,
          },
        },
      })
    ).pipe(
      map(value => value.isSignUpComplete),
      catchError(() => of(false))
    );
  }

  logout(): Observable<boolean> {
    return from(cognitoSignOut()).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  getCurrentUser(): Observable<User> {
    return from(fetchUserAttributes()).pipe(map(this.userMapper.mapTo));
  }

  listenToAuthStatus(): Observable<boolean> {
    return this.authListener$.asObservable().pipe(
      filter(event => event !== undefined),
      map(event => event !== 'signedOut')
    );
  }

  checkUserSession(): Observable<boolean> {
    return from(getCurrentUserCognito()).pipe(
      map(val => !!val.userId),
      catchError(() => of(false))
    );
  }
}
