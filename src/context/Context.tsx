import React, { createContext, useContext, useReducer } from 'react';
import { State } from '../types/State';
import { Action } from '../types/Action';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

const initialState: State = {
  todos: [],
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
        todos: state.todos.map((todo: Todo) =>
          todo.id === action.payload.id ? action.payload : todo,
        ),
      };

    case 'removeTodo':
      return {
        ...state,
        todos: state.todos.filter((todo: Todo) => todo.id !== action.payload),
      };

    case 'setTodos':
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

export const AppContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
