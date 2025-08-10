import { createContext, Dispatch, useReducer } from 'react';
import { Action, initialState, State, TodoReducer } from './TodosReducer';

export const TodosContext = createContext<TodosContextType | null>(null);

interface TodosContextType {
  state: State;
  dispatch: Dispatch<Action>;
}

interface Props {
  children: React.ReactNode;
}
export const TodosProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(TodoReducer, initialState);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
