import { Task } from '@/shared/domain/models/task.model';
import { createActionGroup, props } from '@ngrx/store';

export const TasksActions = createActionGroup({
  source: 'Tasks',
  events: {
    'Create Task': props<Task>(),
  },
});
