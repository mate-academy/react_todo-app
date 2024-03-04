import React, { createContext, useEffect, useReducer } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Todo } from '../types/Todo';

type Props = {
  children: React.ReactNode;
};

type State = {
  todos: Todo[];
  filter: Status;
};

type Action =
  | { type: 'init'; payload: Todo[] }
  | { type: 'setFilter'; payload: Status }
  | { type: 'add'; payload: string }
  | { type: 'delete'; payload: number }
  | { type: 'toggleStatus'; payload: number }
  | { type: 'clearCompleted' }
  | { type: 'update'; payload: { id: number; title: string } }
  | { type: 'toggleAll'; payload: boolean };

export enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

const initialState = {
  todos: [],
  filter: Status.All,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setFilter':
      return { ...state, filter: action.payload };
    case 'add':
      return {
        ...state,
        todos: [
          { id: +new Date(), title: action.payload, completed: false },
          ...state.todos,
        ],
      };
    case 'delete':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'toggleStatus':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };
    case 'clearCompleted':
      return { ...state, todos: state.todos.filter(todo => !todo.completed) };
    case 'update':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo,
        ),
      };
    case 'toggleAll':
      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: action.payload,
        })),
      };
    case 'init':
      return { ...state, todos: action.payload };
    default:
      throw new Error();
  }
}

export const TodosContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [todos, setTodos] = useLocalStorage('todos', state.todos);

  useEffect(() => {
    dispatch({ type: 'init', payload: todos });
  }, []);

  useEffect(() => {
    setTodos(state.todos);
  }, [state.todos]);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
