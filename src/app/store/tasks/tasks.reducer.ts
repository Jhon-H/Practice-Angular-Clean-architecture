import { createReducer, on } from '@ngrx/store';
import { TasksActions } from './tasks.actions';
import { Task } from '@/shared/domain/models/task.model';

interface TaskState {
  tasks: Task[];
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
