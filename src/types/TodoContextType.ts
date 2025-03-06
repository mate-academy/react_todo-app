import { Todo } from "./Todo";

export interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, data: Partial<Todo>) => void;
  toggleAll: () => void;
  clearCompleted: () => void;
  loadingTodoIds: number[];
  setLoadingTodoIds: React.Dispatch<React.SetStateAction<number[]>>;
  selectedTodoId: number | null;
  setSelectedTodoId: (id: number | null) => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
}
