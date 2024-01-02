import React, { useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';
import { useLocalStorage } from './hooks/useLoclStorage';

type TodoContext = {
  todos: Todo[],
  setTodos: (v: Todo[]) => void,
  isToggleAllStatus: boolean,
  setIsToggleAllStatus: (value: boolean) => void,
  filterStatus: Status,
  setFilterStatus: (status: Status) => void,
  filterTodos: () => Todo[],
};

export const TodosContext = React.createContext<TodoContext>({
  todos: [],
  setTodos: () => { },
  isToggleAllStatus: false,
  setIsToggleAllStatus: () => { },
  filterStatus: Status.ALL,
  setFilterStatus: () => { },
  filterTodos: () => [],
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [isToggleAllStatus, setIsToggleAllStatus] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<Status>(Status.ALL);

  const filterTodos = () => {
    switch (filterStatus) {
      case (Status.ACTIVE):
        return todos.filter(todo => !todo.completed);

      case (Status.COMPLETED):
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  const todoState = useMemo(() => ({
    todos,
    setTodos,
    isToggleAllStatus,
    setIsToggleAllStatus,
    filterStatus,
    setFilterStatus,
    filterTodos,
  }), [todos, filterStatus, filterTodos, setTodos, isToggleAllStatus]);

  return (
    <TodosContext.Provider value={todoState}>
      {children}
    </TodosContext.Provider>
  );
};
