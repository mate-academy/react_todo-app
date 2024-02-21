import {
  useEffect,
  useReducer,
  createContext,
} from 'react';
import { Todo } from '../types/Todo';

export type Action =
  | { type: 'add', payload: Todo }
  | { type: 'remove', payload: number }
  | { type: 'toggleComplete', payload: number }
  | { type: 'toggleCompleteAll' }
  | { type: 'toggleCompleted', payload: { id: number, newValue: string } }
  | { type: 'edit', payload: { id: number, newValue: string } }
  | { type: 'clearCompleted' };

type State = Todo[];

type Props = {
  children: React.ReactNode,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'add':
      return [...state, action.payload];

    case 'remove':
      return state.filter(todo => todo.id !== action.payload);

    case 'toggleComplete':
      return state.map(todo => {
        return todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo;
      });

    case 'toggleCompleteAll': {
      const allCompleted = state.every(todo => todo.completed);

      return state.map(todo => ({ ...todo, completed: !allCompleted }));
    }

    case 'toggleCompleted':
      return state.map(todo => {
        return todo.id === action.payload.id
          ? { ...todo, title: action.payload.newValue }
          : todo;
      });

    case 'clearCompleted':
      return state.filter(todo => !todo.completed);

    case 'edit':
      return state.map(todo => {
        return todo.id === action.payload.id
          ? { ...todo, title: action.payload.newValue }
          : todo;
      });

    default:
      return state;
  }
};

const LOCAL_STORAGE_KEY = 'todos';

const getInitialTodos = (): State => {
  const dataFromStorage = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (dataFromStorage) {
    try {
      return JSON.parse(dataFromStorage);
    } catch (e) {
      return [];
    }
  }

  return [];
};

const initialTodos = getInitialTodos();

export const StateContext = createContext<State>(initialTodos);
export const DispatchContext = createContext((action: Action) => {
  // eslint-disable-next-line
  console.debug(action);
});

export const TodosContext: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialTodos);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
