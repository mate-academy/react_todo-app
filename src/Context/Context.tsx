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
  allTodos : Todo[]
  todos: Todo[];
  sortFilter: 'ALL' | 'ACTIVE' | 'COMPLETED';
};

type Action =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'CLEAR_TODOS' }
  | { type: 'SET_TODOS'; payload: Todo[] }
  | { type: 'REMOVE_TODO'; payload: number }
  | { type: 'CHANGE_STATUS'; payload?: number | 'ALL' }
  | { type: 'CHANGE_FILTER'; payload: 'ALL' | 'ACTIVE' | 'COMPLETED' }
  | { type: 'TOGGLE_ALL'}

const initialState: State = {
  todos: [],
  allTodos: [],
  sortFilter: 'ALL',


};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_TODOS': {
      return {
        ...state,
        allTodos: action.payload,
        todos: action.payload.filter(todo => {
          if (state.sortFilter === 'ACTIVE') return !todo.completed;
          if (state.sortFilter === 'COMPLETED') return todo.completed;
          return true;
        }),
      };
    }

    case 'ADD_TODO': {
      const newAllTodos = [...state.allTodos, action.payload];
      return {
        ...state,
        allTodos: newAllTodos,
        todos: newAllTodos.filter(todo => {
          if (state.sortFilter === 'ACTIVE') return !todo.completed;
          if (state.sortFilter === 'COMPLETED') return todo.completed;
          return true;
        }),
      };
    }

    case 'REMOVE_TODO': {
      const newAllTodos = state.allTodos.filter(todo => todo.id !== action.payload);
      return {
        ...state,
        allTodos: newAllTodos,
        todos: newAllTodos.filter(todo => {
          if (state.sortFilter === 'ACTIVE') return !todo.completed;
          if (state.sortFilter === 'COMPLETED') return todo.completed;
          return true;
        }),
      };
    }

    case 'CLEAR_TODOS': {
      return {
        ...state,
        allTodos: [],
        todos: [],
      };
    }

    case 'CHANGE_STATUS': {
      const updatedAllTodos = state.allTodos.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
      return {
        ...state,
        allTodos: updatedAllTodos,
        todos: updatedAllTodos.filter(todo => {
          if (state.sortFilter === 'ACTIVE') return !todo.completed;
          if (state.sortFilter === 'COMPLETED') return todo.completed;
          return true;
        }),
      };
    }

    case 'CHANGE_FILTER': {
      return {
        ...state,
        sortFilter: action.payload,
        todos: state.allTodos.filter(todo => {
          if (action.payload === 'ACTIVE') return !todo.completed;
          if (action.payload === 'COMPLETED') return todo.completed;
          return true;
        }),
      };
    }

    case 'TOGGLE_ALL': {
      const completed = !state.allTodos.every(todo => todo.completed);
      const updatedAllTodos = state.allTodos.map(todo => ({ ...todo, completed }));

      return {
        ...state,
        allTodos: updatedAllTodos,
        todos: updatedAllTodos.filter(todo => {
          if (state.sortFilter === 'ACTIVE') return !todo.completed;
          if (state.sortFilter === 'COMPLETED') return todo.completed;
          return true;
        }),
      };
    }

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
