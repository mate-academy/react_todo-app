import React, { useReducer } from 'react';

import {
  Action, State, TodoReducer,
} from './reducer';

type DispatchContextType = {
  state: State,
  dispatch: React.Dispatch<Action>
};

export const initialState: State = {
  todos: JSON.parse(localStorage.getItem('todos')
    || '[]'),
};

export const TodoContext = React.createContext<DispatchContextType>({
  state: initialState,
  dispatch: () => null,
});

type Props = {
  children: React.ReactNode;
};

const TodoProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(TodoReducer, initialState);

  localStorage.setItem('todos', JSON.stringify(state.todos));

  return (
    <TodoContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
