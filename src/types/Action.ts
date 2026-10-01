import { FilterType } from './FilterType';
import { Todo } from './Todo';

export type Action =
  | { type: 'addTodo'; payload: Todo }
  | { type: 'setTodos'; payload: Todo[] }
  | { type: 'setFilter'; payload: FilterType }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'clearCompletedTodos' }
  | { type: 'stopHeaderFocus' }
  | { type: 'toggleCompletionStatus'; payload: number[] }
  | { type: 'updateTodoTitle'; payload: { id: number; title: string } };
