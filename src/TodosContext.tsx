import React, { useMemo, useState } from 'react';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { useLocalStorage } from './hooks/useLocalStorage';

type TodoContext = {
  todos: Todo[];
  setTodos: (v: Todo[]) => void,
  isToggleAllStatus: boolean,
  setIsToggleAllStatus: (status:boolean) => void,
  setFilterBy: (value: Status) => void,
  filterBy: Status,
  todosFilter: () => Todo[],
};

type Props = {
  children: React.ReactNode;
};

export const TodosContext = React.createContext<TodoContext>({
  todos: [],
  setTodos: () => {},
  isToggleAllStatus: false,
  setIsToggleAllStatus: () => {},
  setFilterBy: () => {},
  filterBy: Status.all,
  todosFilter: () => [],
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [isToggleAllStatus, setIsToggleAllStatus] = useState<boolean>(
    todos.every(todo => todo.completed) && todos.length > 0,
  );
  const [filterBy, setFilterBy] = useState<Status>(Status.all);

  const todosFilter = () => {
    switch (filterBy) {
      case Status.active:
        return todos.filter(todo => !todo.completed);
      case Status.completed:
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
    setFilterBy,
    filterBy,
    todosFilter,
  }), [todos, filterBy]);

  return (
    <TodosContext.Provider value={todoState}>
      {children}
    </TodosContext.Provider>
  );
};
