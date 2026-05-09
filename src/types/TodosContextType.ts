import { FilterTodos } from './FilterTodosEnum';
import { Todo } from './Todo';

export type TodosContextType = {
  todos: Todo[];
  filteredTodos: Todo[];
  filter: FilterTodos;
  setFilter: (filterBy: FilterTodos) => void;
  clearCompletedTodos: () => void;
  toggleAll: () => void;
  toggleTodo: (id: number) => void;
  areAllTodosCompleted: () => boolean;
  updateTodo: (todoId: number, newTitle: string) => void;
  deleteTodo: (id: number) => void;
  saveTodo: (todoTitle: string) => void;
};
