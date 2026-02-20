import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { FilterEnum, State } from './types';
import { Actions, reducer } from './todosReducer';

const initialState: State = {
  todos: JSON.parse(localStorage.getItem('todos') || '[]'),
  filter: FilterEnum.All,
  editingId: null,
};

type TodoContextType = {
  state: State;

  dispatch: React.Dispatch<Actions>;
};

const TodosContext = createContext<TodoContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('useTodos must be used inside TodoProvider');
  }

  return context;
};
