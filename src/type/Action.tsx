import { Todo } from './Todo';

export type Action =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'TOGGLE_ALL'; payload: boolean }
  | { type: 'COMPLETE_TODO'; payload: boolean; item: number }
  | { type: 'CLEAR_COMPLETED_TODOS' }
  | { type: 'CLEAR_TODO'; payload: number }
  | { type: 'EDIT_TODO'; payload: number; editTitle: string }
  | { type: 'EMPTY_TODO'; payload: number };
