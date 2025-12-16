import React, { useContext, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodosContext } from './TodosContext';

interface SelectedTodosContextType {
  selectedTodos: Todo[];
  setSelectedTodos: (selectedTodos: Todo[]) => void;
}

export const SelectedTodosContext =
  React.createContext<SelectedTodosContextType>({
    selectedTodos: [],
    setSelectedTodos: () => {},
  });

type Props = {
  children: React.ReactNode;
};

export const SelectedTodosProvider: React.FC<Props> = ({ children }) => {
  const { todos } = useContext(TodosContext);
  const [selectedTodos, setSelectedTodos] = useState<Todo[]>(todos);

  const value = useMemo(
    () => ({
      selectedTodos,
      setSelectedTodos,
    }),
    [selectedTodos],
  );

  return (
    <SelectedTodosContext.Provider value={value}>
      {children}
    </SelectedTodosContext.Provider>
  );
};
