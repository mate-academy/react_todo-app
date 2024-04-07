import React, { useReducer } from 'react';
import { Todos } from '../types/Todos';
import { initialTodo } from '../utils/initialTodo';
import { ActionType } from '../types/ActionType';
import { reducer } from '../utils/reducer';

type Props = {
  children: React.ReactNode;
};

interface TodosContextType {
  data: Todos;
  dispatch: React.Dispatch<ActionType>;
}

export const TodosContext = React.createContext<TodosContextType>(
  {} as TodosContextType,
);

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [data, dispatch] = useReducer(reducer, initialTodo);

  return (
    <TodosContext.Provider
      value={{
        data,
        dispatch,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
