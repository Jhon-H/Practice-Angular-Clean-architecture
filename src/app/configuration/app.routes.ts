import { Routes } from '@angular/router';
import { COMPLETE_ROUTES, ROUTES } from '../ui/helpers/constants/routes';
import { RoleEnum } from '@/infraestructure/models/user.model';
import { HomeComponent } from '@/ui/pages/home/home.component';
import { taskResolver } from '@/ui/pages/tasks/task.resolver';
import { authGuard } from '@/ui/shared/guards/auth.guard';
import { NotFoundComponent } from '@/ui/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: ROUTES.Home,
    pathMatch: 'full',
    title: 'Home',
    component: HomeComponent,
  },
  {
    path: ROUTES.Tasks,
    title: 'Tareas',
    data: {
      allowedRoles: [RoleEnum.USER, RoleEnum.ADMIN],
      notGrantedRedirectTo: COMPLETE_ROUTES.Login,
    },
    resolve: {
      tasks: taskResolver,
    },
    canActivateChild: [authGuard],
    loadChildren: () => import('../ui/pages/tasks/tasks.routes').then(m => m.routes),
  },
  {
    path: ROUTES.Admin,
    title: 'Admin',
    data: {
      allowedRoles: [RoleEnum.ADMIN],
      notGrantedRedirectTo: COMPLETE_ROUTES.Login,
    },
    canActivateChild: [authGuard],
    loadChildren: () => import('../ui/pages/admin/admin.routes').then(m => m.routes),
  },
  {
    path: ROUTES.Auth,
    title: '',
    data: {
      allowedRoles: [RoleEnum.UNKNOWN],
      notGrantedRedirectTo: COMPLETE_ROUTES.Tasks,
    },
    canActivateChild: [authGuard],
    loadChildren: () => import('../ui/pages/auth/auth.routes').then(m => m.routes),
  },
  {
    path: ROUTES.NotFound,
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: COMPLETE_ROUTES.NotFound,
  },
];
