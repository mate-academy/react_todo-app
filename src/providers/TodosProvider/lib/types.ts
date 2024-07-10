import { Todo } from '../../../types/Todo';

export interface ITodosState {
  todos: Todo[] | [];
}

export type ITodosAction =
  | { type: 'add'; payload: string }
  | { type: 'update'; payload: Todo }
  | { type: 'remove'; payload: number }
  | { type: 'toggleCheked' };
