import { SelectedFilter } from './SelectedFilter';
import { Todo } from './Todo';

export type Action =
  | { type: 'toogleAllChecked' }
  | { type: 'addTodo'; payload: Todo }
  | { type: 'setQuery'; payload: string }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'massDelete'; payload: number[] }
  | { type: 'changeCheckbox'; payload: number }
  | { type: 'updateTodo'; payload: Todo }
  | { type: 'setCurrentTitle'; payload: string }
  | { type: 'setEditingTodoId'; payload: number | null }
  | { type: 'setFilter'; payload: SelectedFilter };
