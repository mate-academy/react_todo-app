import React, { useMemo, useState } from 'react';
import { Todo } from '../../types/Todo';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Status } from '../../types/Status';

interface ITodosContext {
  todosStatus: Status,
  todos: Todo[],
  setTodosStatus: React.Dispatch<React.SetStateAction<Status>>,
  setTodos: (v: Todo[]) => void,
}

export const TodosContext = React.createContext<ITodosContext>({
  todosStatus: Status.All,
  todos: [],
  setTodosStatus: () => { },
  setTodos: () => { },
});

export const useTodos = (): ITodosContext => React.useContext(TodosContext);

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [todosStatus, setTodosStatus] = useState(Status.All);

  const value = useMemo(() => ({
    todosStatus,
    todos,
    setTodosStatus,
    setTodos,
  }), [todos, todosStatus]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
