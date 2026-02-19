import { Filter, FilterEnum, State } from './types';

export const initialState: State = {
  todos: [],
  filter: FilterEnum.All,
  editingId: null,
};

type Actions =
  | { type: 'ADD'; payload: string }
  | { type: 'DELETE'; payload: number }
  | { type: 'TOGGLE'; payload: number }
  | { type: 'TOGGLE_ALL' }
  | { type: 'SET_FILTER'; payload: Filter }
  | { type: 'START_EDIT'; payload: number }
  | { type: 'FINISH_EDIT'; payload: { id: number; title: string } }
  | { type: 'CANCEL_EDIT' }
  | { type: 'CLEAR_COMPLETED' };

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: +new Date(),
            title: action.payload,
            completed: false,
          },
        ],
      };
    case 'DELETE':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'TOGGLE':
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t,
        ),
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    case 'START_EDIT':
      return {
        ...state,
        editingId: action.payload,
      };
    case 'TOGGLE_ALL':
      const allCompleted = state.todos.every(t => t.completed);

      return {
        ...state,
        todos: state.todos.map(t => ({ ...t, completed: !allCompleted })),
      };
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
    case 'FINISH_EDIT': {
      const trimmedTitle = action.payload.title.trim();

      if (!trimmedTitle) {
        return {
          ...state,
          todos: state.todos.filter(t => t.id !== action.payload.id),
          editingId: null,
        };
      }

      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload.id ? { ...t, title: trimmedTitle } : t,
        ),
        editingId: null,
      };
    }

    case 'CANCEL_EDIT':
      return {
        ...state,
        editingId: null,
      };

    default:
      return state;
  }
};
