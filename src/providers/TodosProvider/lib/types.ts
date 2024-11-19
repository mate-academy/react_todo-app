import { Todo, TodoStatus } from '../../../types/Todo';

export interface ITodosState {
  todos: Todo[] | [];
  filterByStatus: TodoStatus;
}

export type ITodosAction =
  | { type: 'add'; payload: Pick<Todo, 'title'> }
  | { type: 'update'; payload: Todo }
  | { type: 'remove'; payload: Pick<Todo, 'id'> }
  | { type: 'changeStatusFiltering'; payload: TodoStatus };
