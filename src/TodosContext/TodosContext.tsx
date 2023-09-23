import React, { useMemo, useState } from 'react';

import { Todo } from '../Interface/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Status } from '../enum/Status';

type TodoContext = {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  toggleAllStatus: boolean,
  setToggleAllStatus: (toggled: boolean) => void,
  filterStatus: Status,
  setFilterStatus: (status: Status) => void,
  filterTodos: () => Todo[],
};

type Props = {
  children: React.ReactNode,
};

export const TodosContext = React.createContext<TodoContext>({
  todos: [],
  setTodos: () => {},
  toggleAllStatus: false,
  setToggleAllStatus: () => {},
  filterStatus: Status.ALL,
  setFilterStatus: () => {},
  filterTodos: () => [],
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [toggleAllStatus, setToggleAllStatus] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<Status>(Status.ALL);

  const filterTodos = () => {
    switch (filterStatus) {
      case Status.ALL:
        return todos;
      case Status.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case Status.COMPLETED:
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
    filterTodos,
    filterStatus,
    setFilterStatus,
  }), [todos, filterStatus]);

  return (
    <TodosContext.Provider value={todoState}>
      {children}
    </TodosContext.Provider>
  );
};
