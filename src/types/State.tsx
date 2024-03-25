import { Filter } from './Filter';
import { Todo } from './Todo';

export interface State {
  todos: Todo[];
  filterBy: Filter;
  addTodo: (newTodo: Todo) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
