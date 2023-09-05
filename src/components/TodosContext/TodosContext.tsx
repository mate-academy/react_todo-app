import React, { useMemo, useState } from 'react';
import { todos as todosFromServer } from '../../api/Todos';
import { Todo } from '../../types/Todo';

interface ITodosContext {
  todosStatus: string,
  todos: Todo[],
  setTodosStatus: React.Dispatch<React.SetStateAction<string>>,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
}

export const TodosContext = React.createContext<ITodosContext>({
  todosStatus: '',
  todos: [],
  setTodosStatus: () => { },
  setTodos: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState(todosFromServer);
  const [todosStatus, setTodosStatus] = useState('All');

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
