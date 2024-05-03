import { Todo } from './Todo';

// Type for TodoListContext
export type TodoListContextType = {
  todoList: Array<Todo> | [];
  globalTodoList: Array<Todo> | [];
  addTask: (todo: string) => void;
  deleteTask: (id: number) => void;
  completeTask: (id: number) => void;
  editTask: (id: number, newTodo: string) => void;
  clearCompletedTasks: () => void;
  completeAllTasks: () => void;
  uncompletedCount: number;
  completedCount: number;
  allCompletedTasks: boolean;
  currentFilter: string;
  setCurrentFilter: (value: string) => void;
};
