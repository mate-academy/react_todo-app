import { Todo } from './Todo';

export interface TodoContextType {
  todos: Todo[];
  filter: string;
  setFilter: (text: string) => void;
  addTodo: (text: string) => void;
  clearedDone: () => void;
  todoComplete: () => void;
  completedTodo: (text: string) => void;
  editTodo: (newTitle: string, todoId: string) => void;
  deleteItem: (text: string) => void;
}
