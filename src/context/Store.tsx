import { Filter, Todo } from '../types/todo';
import { createContext, FC, useReducer } from 'react';

interface State {
  todos: Todo[];
  filteredTodos: Todo[];
}

type Action =
  | { type: 'addArray'; payload: Todo[] | [] }
  | { type: 'add'; payload: Todo }
  | { type: 'remove'; payload: number }
  | { type: 'updateTodo'; payload: Todo }
  | { type: 'toggleCompleted'; payload: number }
  | { type: 'clearCompletedTodo' }
  | { type: 'toggleAll' };

const initialState: State = {
  todos: [],
  filteredTodos: [],
};

function reducer(state: State, action: Action | Filter): State {
  const { todos } = state;

  if (action === null) {
    return { ...state, filteredTodos: [] };
  }

  if (typeof action === 'string') {
    switch (action) {
      case 'all':
        return { ...state, filteredTodos: [...todos] };
      case 'active':
        return {
          ...state,
          filteredTodos: todos.filter(todo => !todo.completed),
        };
      case 'completed':
        return {
          ...state,
          filteredTodos: todos.filter(todo => todo.completed),
        };

      default:
        return state;
    }
  } else {
    switch (action.type) {
      case 'addArray':
        return { ...state, todos: [...action.payload] };
      case 'add':
        return { ...state, todos: [...todos, action.payload] };
      case 'remove':
        return {
          ...state,
          todos: todos.filter(todo => todo.id !== action.payload),
        };
      case 'updateTodo':
        const isTitle = action.payload.title.trim() === '';
        return isTitle
          ? {
              ...state,
              todos: todos.filter(todo => todo.id !== action.payload.id),
            }
          : {
              ...state,
              todos: todos.map(todo =>
                todo.id === action.payload.id
                  ? { ...todo, title: action.payload.title }
                  : todo,
              ),
            };
      case 'clearCompletedTodo':
        return {
          ...state,
          todos: todos.filter(todo => !todo.completed),
        };
      case 'toggleCompleted':
        return {
          ...state,
          todos: todos.map(todo =>
            todo.id === action.payload
              ? { ...todo, completed: !todo.completed }
              : todo,
          ),
        };
      case 'toggleAll':
        const isTheOneOfNotCompleted = state.todos.find(
          todo => !todo.completed,
        );

        return isTheOneOfNotCompleted
          ? {
              ...state,
              todos: todos.map(todo => ({ ...todo, completed: true })),
            }
          : {
              ...state,
              todos: todos.map(todo => ({ ...todo, completed: false })),
            };

      default:
        return state;
    }
  }
}

export const StateContext = createContext(initialState);
export const DispatchContext = createContext((action: Action | Filter) => {});

type Props = {
  children: React.ReactNode;
};
export const GlobalStateProvader: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
