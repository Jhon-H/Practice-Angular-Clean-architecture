import { Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { TasksComponent } from './tasks.component';
import { RoleEnum } from '@/shared/domain/types';
import { COMPLETE_ROUTES } from '@/shared/domain/routes';

export const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    // pathMatch: 'full', // ! OJO: Esto evitaría que se ejecute el guard en las rutas hijas (si es que tiene children)
    // children: [] // ! OJO: La ruta hija se renderiza dentro de la del padre. Como si fuera un layout
  },
  {
    path: ':taskId',
    component: TaskComponent,
    data: {
      allowedRoles: [RoleEnum.USER],
      notGrantedRedirectTo: COMPLETE_ROUTES.Login,
    },
  },
];
