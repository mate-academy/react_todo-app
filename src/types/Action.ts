import { FilterOption } from './FilterOption';
import { Todo } from './Todo';

export type Action =
  | { type: 'addTodo'; payload: Todo }
  | { type: 'updateTodo'; payload: Todo }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'setTodos'; payload: Todo[] }
  | { type: 'setFilter'; payload: FilterOption };
