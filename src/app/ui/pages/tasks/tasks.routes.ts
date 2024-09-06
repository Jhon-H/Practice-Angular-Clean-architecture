import { Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { TasksComponent } from './tasks.component';
import { RoleEnum } from '@/infraestructure/models/user.model';
import { COMPLETE_ROUTES } from '@/ui/helpers/constants/routes';

export const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
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
