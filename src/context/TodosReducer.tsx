import { Actions } from '../constants/Actions';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';
import { TODOS_KEY } from '../utils/localStorage';

export interface State {
  todos: Todo[];
  filter: Filter;
}

export const initialState: State = {
  todos: JSON.parse(localStorage.getItem(TODOS_KEY) || '[]'),
  filter: Filter.All,
};

export type Action =
  | { type: Actions.ADD; payload: Todo }
  | { type: Actions.DELETE; payload: number }
  | { type: Actions.UPDATE; payload: { id: number; title: string } }
  | { type: Actions.TOGGLE; payload: number }
  | { type: Actions.TOGGLE_ALL }
  | { type: Actions.CLEAR }
  | { type: Actions.FILTER; payload: Filter };

export const TodoReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case Actions.ADD:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case Actions.DELETE:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case Actions.UPDATE:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo,
        ),
      };

    case Actions.TOGGLE:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };

    case Actions.TOGGLE_ALL:
      const allCompleted = state.todos.every(todo => todo.completed);

      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: !allCompleted,
        })),
      };

    case Actions.CLEAR:
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case Actions.FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
};
