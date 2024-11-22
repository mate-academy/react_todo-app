/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { createContext, useMemo } from 'react';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';

type TodosProps = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export const TodosContext = createContext<TodosProps>({
  todos: [],
  setTodos: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
    }),
    [todos],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
