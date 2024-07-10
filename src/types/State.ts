import { SelectedFilter } from './SelectedFilter';
import { Todo } from './Todo';

export type State = {
  todos: Todo[];
  query: string;
  filter: SelectedFilter;
  editingTodoId: number | null;
  currentTitle: string;
};
