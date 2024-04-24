import { Filter } from './Filter';
import { Todo } from './Todo';

export type Action =
  | { type: 'addTodo'; payload: Todo }
  | { type: 'removeTodo'; payload: number }
  | { type: 'changeTodo'; payload: Todo }
  | { type: 'setTodos'; payload: Todo[] }
  | { type: 'setFilter'; payload: Filter };
