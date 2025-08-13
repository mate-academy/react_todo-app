import { createContext, Dispatch, useReducer } from 'react';
import { Action, initialState, State, TodoReducer } from './TodosReducer';
import { loadTodos } from '../utils/localStorage';
import { Filter } from '../types/Filter';

export interface TodosContextType {
  state: State;
  dispatch: Dispatch<Action>;
}

export const TodosContext = createContext<TodosContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const TodosProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(TodoReducer, initialState, () => ({
    todos: loadTodos(),
    filter: Filter.All,
  }));

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
