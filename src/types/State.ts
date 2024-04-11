import { Todo } from './Todo';

export interface State {
  todos: Todo[];
  filter: string;
  editingTodo: Todo | null;
}
