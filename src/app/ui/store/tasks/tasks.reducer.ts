import { createReducer, on } from '@ngrx/store';
import { TasksActions } from './tasks.actions';
import { TaskViewModel } from '@/infraestructure/models/task.model';

interface TaskState {
  tasks: TaskViewModel[];
}

const initialState: TaskState = {
  tasks: [],
};

export const tasksReducer = createReducer(
  initialState,
  on(TasksActions.createTask, (state, newTask) => ({
    ...state,
    tasks: [...state.tasks, newTask],
  }))
);
