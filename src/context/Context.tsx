import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { State } from '../types/State';
import { Action } from '../types/Action';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

const savedData = localStorage.getItem('todos');

const initialState: State = {
  todos: savedData ? JSON.parse(savedData) : [],
  filter: Filter.All,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'addTodo':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case 'changeTodo':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload : todo,
        ),
      };

    case 'removeTodo':
      return {
        ...state,
        todos: state.todos.filter((todo: Todo) => todo.id !== action.payload),
      };

    case 'changeTodos':
      return {
        ...state,
        todos: action.payload,
      };

    case 'setFilter':
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
};

interface ContextData {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<ContextData>({
  state: initialState,
  dispatch: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
