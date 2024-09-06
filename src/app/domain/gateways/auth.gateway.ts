import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';

//? Regresar User o un Error
//? DTO o Modelos para params ?

export abstract class AuthGateway {
  abstract login(params: { username: string; password: string }): Observable<User | null>;

  abstract register(params: {
    username: string;
    password: string;
    email: string;
    picture?: string;
    name: string;
  }): Observable<boolean>;

  abstract logout(): Observable<boolean>;

  abstract getCurrentUser(): Observable<User | null>;

  abstract listenToAuthStatus(): Observable<boolean>;

  abstract checkUserSession(): Observable<boolean>;
}
