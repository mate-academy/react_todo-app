import { Filters } from './Filters';
import { Todo } from './Todo';

// Type for TodoListContext
export type TodoListContextType = {
  todoList: Array<Todo> | [];
  addTask: (todo: string) => void;
  deleteTask: (id: number) => void;
  completeTask: (id: number) => void;
  getFilter: (filter: Filters) => void;
  editTask: (id: number, newTodo: string) => void;
  clearCompletedTasks: () => void;
  completeAllTasks: () => void;
  uncompletedCount: number;
  completedCount: number;
  currentFilter: Filters;
  setCurrentFilter: (value: Filters) => void;
  allCompletedTasks: boolean;
};
