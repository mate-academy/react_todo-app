import { Filter } from './Filter';
import { Todo } from './Todo';

export type Action =
  | { type: 'setTodos'; newTodos: Todo[] }
  | { type: 'setFilterType'; newFilterType: Filter }
  | { type: 'addTodo' }
  | { type: 'setTitle'; text: string }
  | { type: 'checked'; id: number }
  | { type: 'remove'; id: number }
  | { type: 'todos'; payload: Todo[] }
  | { type: 'changeTodo'; id: number; newTodo: Todo };
