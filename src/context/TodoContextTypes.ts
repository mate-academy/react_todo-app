import { Dispatch } from 'react';
import { Filter, Todo } from '../entities/Todo';

export type State = {
  todos: Todo[];
  filter: Filter;
};

export type Action =
  | { type: 'LOAD_TODOS'; payload: Todo[] }
  | { type: 'SET_FILTER'; payload: Filter }
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'TOGGLE_ALL' }
  | { type: 'REMOVE_TODO'; payload: number }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'EDIT_TODO'; payload: { id: number; title: string } };

export type TodoContextType = {
  state: State;
  dispatch: Dispatch<Action>;
  addTodo: (todo: Todo) => void;
  setFilter: (filter: Filter) => void;
  toggleTodo: (id: number) => void;
  toggleAll: () => void;
  removeTodo: (id: number) => void;
  clearCompleted: () => void;
  editTodo: (id: number, title: string) => void;
  focusAddInput?: () => void;
  focusTrigger: number;
};
