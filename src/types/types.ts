export enum Status {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export interface Todo {
  completed: boolean;
  id: number;
  title: string;
}

export type TodoContextType = {
  todos: Todo[];
  filteredTodos: Todo[];
  counterTodos: number;
  setTodos: (v: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  toggleTodo: (todo: Todo) => void;
  status: Status;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  counterCompletedTodos: number;
  toggleAllTodo: () => void;
  deleteTodo: (todoId: number) => void;
  clearCompleted: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
};
