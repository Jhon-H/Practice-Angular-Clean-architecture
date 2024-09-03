import { Routes } from '@angular/router';
import { HomeComponent } from '@/routes/home/home.component';
import { COMPLETE_ROUTES, ROUTES } from '@/shared/domain/routes';
import { RoleEnum } from './shared/domain/types';
import { taskResolver } from '@/routes/tasks/task.resolver';
import { NotFoundComponent } from '@/routes/not-found/not-found.component';
import { authGuard } from './core/providers/guards/auth.guard';

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
    loadChildren: () =>
      import('./routes/tasks/tasks.routes').then(m => m.routes),
  },
  {
    path: ROUTES.Admin,
    title: 'Admin',
    data: {
      allowedRoles: [RoleEnum.ADMIN],
      notGrantedRedirectTo: COMPLETE_ROUTES.Login,
    },
    canActivateChild: [authGuard],
    loadChildren: () =>
      import('./routes/admin/admin.routes').then(m => m.routes),
  },
  {
    path: ROUTES.Auth,
    title: '',
    data: {
      allowedRoles: [RoleEnum.UNKNOWN],
      notGrantedRedirectTo: COMPLETE_ROUTES.Tasks,
    },
    canActivateChild: [authGuard],
    loadChildren: () => import('./routes/auth/auth.routes').then(m => m.routes),
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
