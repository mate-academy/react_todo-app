import React, { useState, useMemo } from 'react';

type Props = {
  children: React.ReactNode,
};

type GlobalContent = {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
};

export const TodosContext = React.createContext<GlobalContent>({
  todos: [],
  setTodos: () => [],
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(JSON.parse(localStorage.getItem('todos') || '[]'));

  const contextValue = useMemo(() => {
    return {
      todos,
      setTodos,
    };
  }, [todos]);

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};
