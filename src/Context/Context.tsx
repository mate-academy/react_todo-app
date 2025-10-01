import React, { createContext, useReducer } from 'react';

interface ContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}
export const Context = createContext<ContextType>({} as ContextType);

export type Todo = {
  completed: boolean;
  title: string;
  id: number;
};

type State = {
  todos: Todo[];
};

type Action =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'CLEAR_TODOS' }
  | { type: 'SET_TODOS'; payload: Todo[] }
  | { type: 'REMOVE_TODO'; payload: number }
  | { type: 'CHANGE_STATUS'; payload?: number | 'ALL' };

const initialState: State = {
  todos: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };

    case 'CLEAR_TODOS':
      return { ...state, todos: [] };

    case 'SET_TODOS':
      return {
        ...state,
        todos: action.payload,
      };

    case 'CHANGE_STATUS':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (action.payload === 'ALL') {
            // переключаем все туду
            return { ...todo, completed: todo.completed };
          } else if (todo.id === action.payload) {
            // переключаем конкретный туду
            return { ...todo, completed: !todo.completed };
          } else {
            return todo;
          }
        }),
      };

    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    default:
      return state;
  }
}

type Propss = {
  children: React.ReactNode;
};

export const Provider: React.FC<Propss> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
