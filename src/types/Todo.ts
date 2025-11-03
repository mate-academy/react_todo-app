export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export type FilterStatus = 'all' | 'active' | 'completed';

export type ErrorMessages = {
  LOAD_TODOS: string;
  ADD_TODO: string;
  DELETE_TODO: string;
  UPDATE_TODO: string;
  EMPTY_TITLE: string;
  NETWORK: string;
  UNKNOWN: string;
  LOCAL_STORAGE: string;
  CONTEXT_MISSING: string;
  TOGGLE_ALL_FAIL: string;
  CLEAR_COMPLETED_FAIL: string;
};
