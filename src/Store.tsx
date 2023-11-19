import React, { useEffect, useState } from 'react';
import { Todo } from './interfaces/Todo';

interface Props {
  children: React.ReactNode;
}

export enum Status {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const TodosContext = React.createContext<{
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  visibleTodoApp: boolean;
  setVisibleTodoApp: React.Dispatch<React.SetStateAction<boolean>>;
  todosStatus: Status;
  setTodosStatus: React.Dispatch<React.SetStateAction<Status>>;
}>({
  todos: [],
  setTodos: () => {},
  visibleTodoApp: false,
  setVisibleTodoApp: () => {},
  todosStatus: Status.All,
  setTodosStatus: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodoApp, setVisibleTodoApp] = useState(false);
  const [todosStatus, setTodosStatus] = useState<Status>(Status.All);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('todos') as string);

    if (data) {
      setTodos(data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const value = {
    todos,
    setTodos,
    visibleTodoApp,
    setVisibleTodoApp,
    todosStatus,
    setTodosStatus,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
