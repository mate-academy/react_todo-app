import { Todo } from './Todo';
import { Filter } from './Filter';

export type TodoState = {
  todos: Todo[];
  filter: Filter;
  errorText: string | null;
  query: string;
  isLoading: boolean;
  tempTodo: Todo | null;
  deletingTodoIds: number[];
};

export type TodoAction =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'UPDATE_TODO'; payload: Todo }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'TOGGLE_ALL'; payload: boolean }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET_FILTER'; payload: Filter }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_TEMP_TODO'; payload: Todo | null }
  | { type: 'SET_DELETING_IDS'; payload: number[] };

export type TodoContextType = {
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
};
