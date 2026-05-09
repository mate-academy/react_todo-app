import { createContext } from 'react';
import { TodosContextType } from '../types/TodosContextType';
import { FilterTodos } from '../types/FilterTodosEnum';

export const TodosContext = createContext<TodosContextType>({
  todos: [],
  filteredTodos: [],
  filter: FilterTodos.All,
  setFilter: () => {},
  clearCompletedTodos: () => {},
  toggleAll: () => {},
  toggleTodo: () => {},
  areAllTodosCompleted: () => false,
  updateTodo: () => {},
  deleteTodo: () => {},
  saveTodo: () => {},
});
