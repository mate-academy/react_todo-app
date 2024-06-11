import { Filter } from './Filter';
import { Todo } from './Todo';

export type Action =
  | { type: 'addTodo'; payload: Todo }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'changeTodo'; payload: Todo }
  | { type: 'changeSomeTodos'; payload: Todo[] }
  | { type: 'setFilter'; payload: Filter };
