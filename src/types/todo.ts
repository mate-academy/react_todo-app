export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export enum ActionType {
  ADD = 'add',
  TOGGLE = 'toggle',
  UPDATE = 'update',
  REMOVE = 'remove',
  CLEAR_COMPLETED = 'clearCompleted',
  TOGGLE_ALL = 'toggleAll',
}

export enum Filter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

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
  | { type: ActionType.ADD; title: string }
  | { type: ActionType.TOGGLE; id: number }
  | { type: ActionType.UPDATE; id: number; title: string }
  | { type: ActionType.REMOVE; id: number }
  | { type: ActionType.CLEAR_COMPLETED }
  | { type: ActionType.TOGGLE_ALL; completed: boolean };
