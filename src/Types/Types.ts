export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type EditPayload = {
  todo: Todo;
  trimmedTitle: string;
};

export type Filter = 'All' | 'Active' | 'Completed';

export type Action =
  | { type: 'add'; payload: string }
  | { type: 'delete'; payload: Todo[] }
  | { type: 'check'; payload: Todo }
  | { type: 'toggleAll' }
  | { type: 'edit'; payload: EditPayload };

export type State = {
  todos: Todo[];
  visibleTodos: Todo[];
  dispatch: (activity: Action) => void;
  filter: Filter;
  setFilter: (filter: Filter) => void;
};
