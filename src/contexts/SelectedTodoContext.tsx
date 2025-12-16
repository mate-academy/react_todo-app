import React, { useMemo, useState } from 'react';
import { Todo } from '../types/Todo';

export const SelectedTodoContext = React.createContext({
  selectedTodo: null as Todo | null,
  setSelectedTodo: (selectedTodo: Todo | null) => {},
});

type Props = {
  children: React.ReactNode;
};

export const SelectedTodoProvider: React.FC<Props> = ({ children }) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const value = useMemo(
    () => ({
      selectedTodo,
      setSelectedTodo,
    }),
    [selectedTodo],
  );

  return (
    <SelectedTodoContext.Provider value={value}>
      {children}
    </SelectedTodoContext.Provider>
  );
};
