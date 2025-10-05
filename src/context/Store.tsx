import { Todo } from '../types/todo';
import { createContext, FC, useReducer } from 'react';

interface State {
  todos: Todo[];
}

type Action =
  | { type: 'add'; payload: Todo }
  | { type: 'remove'; payload: number }
  | { type: 'updateTodo'; payload: Todo }
  | { type: 'toggleCompleted'; payload: number }
  | { type: 'clearCompletedTodo' }
  | { type: 'toggleAll' };

function reducer(state: State, action: Action): State {
  const { todos } = state;

  switch (action.type) {
    case 'add':
      return { ...state, todos: [...todos, action.payload] };
    case 'remove':
      return {
        ...state,
        todos: todos.filter(todo => todo.id !== action.payload),
      };
    case 'updateTodo':
      const isTitile = action.payload.title.trim() === '';
      return isTitile
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
      const isTheOneOfNotCompleted = state.todos.find(todo => !todo.completed);

      return isTheOneOfNotCompleted
        ? { ...state, todos: todos.map(todo => ({ ...todo, completed: true })) }
        : {
            ...state,
            todos: todos.map(todo => ({ ...todo, completed: false })),
          };

    default:
      return state;
  }
}

const initialState: State = {
  todos: [],
};

export const StateContext = createContext(initialState);
export const DispatchContext = createContext((action: Action) => {});

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
