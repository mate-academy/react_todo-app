import React, { useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';
import { useLocalStorage } from './hooks/useLoclStorage';

type TodoContext = {
  todos: Todo[],
  setTodos: (v: Todo[]) => void,
  toggleAllStatus: boolean,
  setToggleAllStatus: (value: boolean) => void,
  filterStatus: Status,
  setFilterStatus: (status: Status) => void,
  filterTodos: () => Todo[],
};

export const TodosContext = React.createContext<TodoContext>({
  todos: [],
  setTodos: () => { },
  toggleAllStatus: false,
  setToggleAllStatus: () => { },
  filterStatus: Status.ALL,
  setFilterStatus: () => { },
  filterTodos: () => [],
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [toggleAllStatus, setToggleAllStatus] = useState<boolean>(false);
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
    toggleAllStatus,
    setToggleAllStatus,
    filterStatus,
    setFilterStatus,
    filterTodos,
  }), [todos, filterStatus]);

  return (
    <TodosContext.Provider value={todoState}>
      {children}
    </TodosContext.Provider>
  );
};
