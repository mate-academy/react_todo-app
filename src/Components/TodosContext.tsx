import React, { useMemo } from 'react';
import { Todo } from '../Types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface TodosContextInterface {
  todos: Todo[];
  setTodos: (v: Todo[]) => void;
}

export const TodosContext = React.createContext<TodosContextInterface>({
  todos: [],
  setTodos: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
    }),
    [todos, setTodos],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
