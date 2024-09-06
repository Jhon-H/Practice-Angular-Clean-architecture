import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { COMPLETE_ROUTES, ROUTES } from '@/ui/helpers/constants/routes';

export const routes: Routes = [
  {
    path: ROUTES.Login,
    component: LoginComponent,
  },
  {
    path: ROUTES.Register,
    component: RegisterComponent,
  },
  {
    path: '**',
    redirectTo: COMPLETE_ROUTES.Login,
  },
];
