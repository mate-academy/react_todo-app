import { Todo } from './todo';

// prettier-ignore
export type TodoAction =
  | { type: 'HYDRATE_TODOS'; payload: Todo[] }
  | { type: 'ADD_TODO'; payload: { title: string } }
  | { type: 'UPDATE_TODO'; payload: { id: string; title: string } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'CHECK_AS_COMPLETED'; payload: { completed: boolean } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'CLEAR_COMPLETED' }
  | {
    type: 'SET_SELECTED_FILTER';
    payload: { selectedFilter: 'all' | 'active' | 'completed' };
  };
