import { Todo } from './Todo';

export interface TodosContextType {
  todos: Todo[];
  filteredTodos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  removeTodo: (todoId: number) => void;
  filter: string;
  setFilter: (filterType: string) => void;
}
