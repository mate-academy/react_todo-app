import { Todo } from '../types/Todo';

export enum ActionType {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  TOGGLE_ALL,
  UPDATE_TODO,
  CLEAR_COMPLETED,
  FILTER_TODO,
}

export type Action =
  | { type: ActionType.ADD_TODO; payload: string }
  | { type: ActionType.DELETE_TODO; payload: number }
  | { type: ActionType.TOGGLE_TODO; payload: number }
  | { type: ActionType.TOGGLE_ALL }
  | { type: ActionType.UPDATE_TODO; id: number; title: string }
  | { type: ActionType.CLEAR_COMPLETED }
  | { type: ActionType.FILTER_TODO; payload: FilterStatus };

export type FilterStatus = 'ALL' | 'ACTIVE' | 'COMPLETED';

export type State = {
  todos: Todo[];
  filterStatus: FilterStatus;
};

export const initialState: State = {
  todos: [],
  filterStatus: 'ALL',
};

export const todoReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.ADD_TODO:
      if (!action.payload) {
        return state;
      }

      const newTodo: Todo = {
        id: +new Date(),
        title: action.payload,
        completed: false,
      };

      return { ...state, todos: [...state.todos, newTodo] };
    case ActionType.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case ActionType.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          return todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo;
        }),
      };
    case ActionType.TOGGLE_ALL:
      const allCompleted = state.todos.every(todo => todo.completed);

      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: !allCompleted,
        })),
      };
    case ActionType.UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id ? { ...todo, title: action.title } : todo,
        ),
      };
    case ActionType.CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.completed !== true),
      };
    case ActionType.FILTER_TODO:
      return {
        ...state,
        filterStatus: action.payload,
      };
    default:
      return state;
  }
};
