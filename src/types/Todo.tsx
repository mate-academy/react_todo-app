export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export enum StatusFilter {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

export type Action =
  | { type: 'ADD_ALL_TODO'; payload: Todo[] }
  | { type: 'ADD_TODO'; payload: { title: string } }
  | { type: 'DELETE_TODO'; payload: { id: number } }
  | { type: 'CHANGE_StATUS_TODO'; payload: { id: number } }
  | { type: 'EDIT_TITLE_TODO'; payload: Omit<Todo, 'completed'> }
  | { type: 'SET_FILTER'; payload: StatusFilter }
  | { type: 'DELETE_COMPLETED_TODOS' }
  | { type: 'TOOGLE_COMPLETE_TODOS' };
