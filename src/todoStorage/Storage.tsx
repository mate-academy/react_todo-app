import React, { useEffect, useReducer } from 'react';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export enum Type {
  Add = 'add',
  Edit = 'edit',
  Remove = 'remove',
  Toggle = 'toggle',
  setStatus = 'setstatus',
  AllComplete = 'allcomplete',
}

export type State = {
  todos: Todo[];
  status: Status;
};

export type Action =
  | { type: Type.Add; id: number; title: string }
  | { type: Type.Edit; id: number; text: string }
  | { type: Type.Remove; id: number }
  | { type: Type.Toggle; id: number }
  | { type: Type.setStatus; payload: Status }
  | { type: Type.AllComplete };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case Type.Add:
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

    case Type.Edit:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id ? { ...todo, title: action.text } : todo,
        ),
      };

    case Type.Remove:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
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

    case Type.setStatus:
      return {
        ...state,
        status: action.payload,
      };

    case Type.AllComplete:
      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: !state.todos.every(tod => tod.completed),
        })),
      };

    default:
      return state;
  }
}

const saveTodosToLocalStorage = localStorage.getItem('todos');

export const initialState: State = {
  todos: saveTodosToLocalStorage ? JSON.parse(saveTodosToLocalStorage) : [],
  status: Status.All,
};

export const TodoContext = React.createContext(initialState);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
//  eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DispatchContext = React.createContext((_action: Action) => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [{ todos, status }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodoContext.Provider value={{ todos, status }}>
        {children}
      </TodoContext.Provider>
    </DispatchContext.Provider>
  );
};
