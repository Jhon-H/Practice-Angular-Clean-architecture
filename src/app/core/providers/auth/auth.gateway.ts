import { Observable } from 'rxjs';
import { AuthUser, NewAuthUser } from './auth.interface';
import { User } from '@/shared/domain/models/user.model';

export abstract class AuthGateway {
  abstract signIn(user: AuthUser): Observable<boolean>;

  abstract sigUp({ username, password, ...rest }: NewAuthUser): Observable<boolean>;

  abstract signOut(): Observable<void>;

  abstract getCurrentUser(): Observable<User>;

  abstract isUserSignedIn(): Observable<boolean>;

  abstract checkUserSession(): Observable<boolean>;
}

