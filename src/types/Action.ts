import { FilterButtons } from './FilterType';
import { Todo } from './Todo';

export type Action =
  | { type: 'ADD TODO' }
  | { type: 'SET FILTER'; filter: FilterButtons }
  | { type: 'ADD NEW TITLE'; newTitle: string }
  | { type: 'FOCUS NEW TODO' }
  | { type: 'CHANGE TODO STATUS'; idNumber: number }
  | { type: 'DELETE TODO'; idNumber: number }
  | { type: 'TOGGLE TODOS' }
  | { type: 'CLEAR COMPLETED' }
  | { type: 'EDIT TODO'; idNumber: number }
  | { type: 'UPDATE TITLE'; idNumber: number; edittedTitle: string }
  | { type: 'GET TODOS FROM STORAGE'; todos: Todo[] };
