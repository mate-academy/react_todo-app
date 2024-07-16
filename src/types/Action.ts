import { FilterType } from './FilterType';

export type Action =
  | { type: 'ADD_TODO' }
  | { type: 'WRITE_NEW_TITLE'; newTitle: string }
  | { type: 'CHANGE_STATUS'; id: number }
  | { type: 'DELETE_TODO'; id: number }
  | { type: 'FILTER_TODOS'; filteredOptions: FilterType }
  | { type: 'REMOVE_COMPLETED' }
  | { type: 'TOGGLE_ALL_TODOS' }
  | { type: 'EDIT_TODO'; id: number }
  | { type: 'HANDLE_ESCAPE'; id: number }
  | { type: 'CHANGE_TITLE'; id: number; changedTitle: string };
