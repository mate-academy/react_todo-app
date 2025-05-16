/* eslint-disable no-param-reassign */
import { Todo } from '../types/Todo';

export enum Filter {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

export type State = {
  todos: Todo[];
  filter: Filter;
};

export type ChangePayload = {
  id: number;
  data: { param: string; value: string | boolean };
};

const initState: State = {
  todos: [],
  filter: Filter.ALL,
};

export type Action =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'CHANGE_TODO'; payload: ChangePayload }
  | { type: 'SET_FILTER'; payload: Filter }
  | { type: 'TOGGLE_COMPLETED' }
  | { type: 'CLEAR' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'CHANGE_TODO':
      const { id, data } = action.payload;

      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === id ? { ...todo, [data.param]: data.value } : todo,
        ),
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    case 'CLEAR':
      const remainTodos = state.todos.filter(todo => !todo.completed);

      return {
        ...state,
        todos: remainTodos,
      };
    case 'TOGGLE_COMPLETED':
      const mode = state.todos.some(todo => !todo.completed);

      if (mode) {
        return {
          ...state,
          todos: state.todos.map(todo => ({ ...todo, completed: true })),
        };
      }

      return {
        ...state,
        todos: state.todos.map(todo => ({ ...todo, completed: false })),
      };

    default:
      return state;
  }
}

const init = (initialArg: State) => {
  const stored = localStorage.getItem('todos');

  if (stored) {
    return {
      ...initialArg,
      todos: JSON.parse(stored),
    };
  }

  return initialArg;
};

export { reducer, initState, init };
