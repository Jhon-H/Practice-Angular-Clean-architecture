// import { inject, Injectable, OnDestroy } from '@angular/core';
// import { Observable } from 'rxjs';
// import { AuthGateway } from './auth.gateway';
// import { AuthUser, NewAuthUser } from './auth.interface';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService implements OnDestroy {
//   private readonly authGateway = inject(AuthGateway);

//   ngOnDestroy(): void {
//   //   this.hubListenerCancel();
//   }

//   signIn(user: AuthUser): Observable<boolean> {
//     return this.authGateway.signIn(user);
//   }

//   sigUp(user: NewAuthUser): Observable<boolean> {
//     return this.authGateway.sigUp(user);
//   }

//   signOut(): Observable<void> {
//     return this.authGateway.signOut();
//   }

//   getCurrentUser() {
//     return this.authGateway.getCurrentUser();
//   }

//   isUserSignedIn(): Observable<boolean> {
//     return this.authGateway.isUserSignedIn();
//   }

//   checkUserSession(): Observable<boolean> {
//     return this.authGateway.checkUserSession();
//   }
// }
