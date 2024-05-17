import { Todo } from './Todo';

export type Action =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'CHANGE_TODO_STATUS'; payload: number }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'UPDATE_TODO_TITLE'; payload: { id: number; title: string } }
  | { type: 'LOAD_TODOS'; payload: Todo[] }
  | { type: 'CLEAR_COMPLETED_TODOS' }
  | { type: 'CHANGE_ALL_TODOS_STATUS' };
