export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type TodoContextValue = {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  updateTodo: (id: number, title: string) => void;
  removeTodo: (id: number) => void;
  clearCompleted: () => void;
  toggleAll: (completed: boolean) => void;
};

export type TodoAction =
  | { type: 'add'; title: string }
  | { type: 'toggle'; id: number }
  | { type: 'update'; id: number; title: string }
  | { type: 'remove'; id: number }
  | { type: 'clearCompleted' }
  | { type: 'toggleAll'; completed: boolean };
