import { FilterOption } from '../types/FilterOption';
import { State } from './todoReducer';

export const initState = (): State => {
  try {
    return {
      todos: JSON.parse(localStorage.getItem('todos') || '[]'),
      filter: FilterOption.ALL,
    };
  } catch {
    return {
      todos: [],
      filter: FilterOption.ALL,
    };
  }
};
