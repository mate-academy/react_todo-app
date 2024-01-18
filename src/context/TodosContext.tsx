import React, { useMemo, useState } from 'react';
import todosFromServer from '../api/todo';
import { Todo } from '../types/Todo';
import { useLocaleStorage } from '../hooks/useLocalStorage';

export const TodosContext = React.createContext<{
  todos: Todo[];
  setTodo: (todos: Todo[]) => void;
  renderTodo: Todo[];
  setRenderTodo: (renderTodo: Todo[]) => void;
}>({
  todos: [],
  setTodo: () => { },
  renderTodo: [],
  setRenderTodo: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const localStore = useLocaleStorage('todos', [...todosFromServer]);
  const [todos, setTodo] = localStore || [...todosFromServer];
  const [renderTodo, setRenderTodo] = useState(todos);

  const value = useMemo(() => {
    return {
      todos,
      setTodo,
      renderTodo,
      setRenderTodo,
    };
  }, [todos, setTodo, renderTodo, setRenderTodo]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
