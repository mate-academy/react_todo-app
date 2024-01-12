import {
  Dispatch, createContext, useState, SetStateAction,
} from 'react';
import { Todo } from '../types/Todo';

type Props = {
  children: React.ReactNode
};

type TodosContextType = {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
};

export const TodosContext
  = createContext<TodosContextType>({ todos: [], setTodos: () => {} });

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[] | []>([]);

  const value = {
    todos,
    setTodos,
  };

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
