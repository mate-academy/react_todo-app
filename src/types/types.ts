export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type Filter = 'all' | 'active' | 'completed';

export type State = {
  todos: Todo[];
  filter: Filter;
};

export type Action =
  | { type: 'ADD_TODO'; payload: { title: string } }
  | { type: 'DELETE_TODO'; payload: { id: number } }
  | { type: 'TOGGLE_TODO'; payload: { id: number } }
  | { type: 'UPDATE_TODO_TITLE'; payload: { id: number; title: string } }
  | { type: 'TOGGLE_ALL_TODOS'; payload: { completed: boolean } }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET_FILTER'; payload: { filter: Filter } }
  | { type: 'LOAD_TODOS'; payload: { todos: Todo[] } };

export type TodoContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};
