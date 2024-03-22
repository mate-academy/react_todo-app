import React, { useEffect, useReducer } from 'react';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export enum Type {
  Added = 'added',
  Editing = 'editing',
  Remove = 'remove',
  Toggle = 'toggle',
  SetStatus = 'setStatus',
}

export enum Status {
  All = '',
  Active = 'active',
  Completed = 'completed',
}

export type Action =
  | { type: Type.Added; id: number; title: string }
  | { type: Type.Editing; id: number; newText: string }
  | { type: Type.Remove; id: number }
  | { type: Type.Toggle; id: number }
  | { type: Type.SetStatus; payload: Status };

export type State = {
  todos: Todo[];
  status: Status;
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case Type.Added:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: +new Date(),
            title: action.title,
            completed: false,
          },
        ],
      };

    case Type.Editing:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id ? { ...todo, title: action.newText } : todo,
        ),
      };

    case Type.Remove:
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.id),
      };

    case Type.Toggle:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };

    case Type.SetStatus:
      return {
        ...state,
        status: action.payload,
      };
  }
}

const getLocalStorage = () => {
  const savedTodos = localStorage.getItem('todos');

  return savedTodos ? JSON.parse(savedTodos) : [];
};

export const initialState: State = {
  todos: getLocalStorage(),
  status: Status.All,
};

export const TodosContext = React.createContext(initialState);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DispatchContext = React.createContext((action: Action) => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodosContext.Provider value={state}>{children}</TodosContext.Provider>
    </DispatchContext.Provider>
  );
};
