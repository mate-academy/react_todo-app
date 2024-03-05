import React, { createContext, useEffect, useReducer, useState } from 'react';
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
  let newState;

  switch (action.type) {
    case 'setFilter':
      newState = { ...state, filter: action.payload };
      break;
    case 'add':
      newState = {
        ...state,
        todos: [
          { id: +new Date(), title: action.payload, completed: false },
          ...state.todos,
        ],
      };
      break;
    case 'delete':
      newState = {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
      break;
    case 'toggleStatus':
      newState = {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };
      break;
    case 'clearCompleted':
      newState = {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
      break;
    case 'update':
      newState = {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo,
        ),
      };
      break;
    case 'toggleAll':
      newState = {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: action.payload,
        })),
      };
      break;
    case 'init':
      newState = { ...state, todos: action.payload };
      break;
    default:
      throw new Error();
  }

  localStorage.setItem('todos', JSON.stringify(newState.todos));

  return newState;
}

export const TodosContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const storedTodos = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos ? JSON.parse(savedTodos) : [];
  })[0];

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    todos: storedTodos,
  });

  useEffect(() => {
    dispatch({ type: 'init', payload: storedTodos });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
