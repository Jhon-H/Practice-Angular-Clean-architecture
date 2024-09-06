import { createActionGroup, props } from '@ngrx/store';
import { TaskViewModel } from '@/infraestructure/models/task.model';

export const TasksActions = createActionGroup({
  source: 'Tasks',
  events: {
    'Create Task': props<TaskViewModel>(),
  },
});
