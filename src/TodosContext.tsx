import React, { useCallback, useMemo, useState } from 'react';
import { Status, Todo } from './types/Todo';

type Context = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filter: Status,
  setFilter: React.Dispatch<React.SetStateAction<Status>>;
  filteredTodos: () => Todo[],
}

type Props = {
  children: React.ReactNode;
}

export const TodosContext = React.createContext<Context>({
  todos:[],
  setTodos: () => {},
  filter: Status.ALL,
  setFilter: () => {},
  filteredTodos: () => [],
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [ todos, setTodos ] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Status>(Status.ALL);


  const filteredTodos = useCallback(() => {
    switch (filter) {
      case Status.ALL:
        return todos;
      case Status.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case Status.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);


  const value = useMemo(() => ({
    todos,
    setTodos,
    filter,
    setFilter,
    filteredTodos,
  }), [todos, setTodos, filter, setFilter, filteredTodos]);

  return (
    <TodosContext.Provider value={ value }>
      {children}
    </TodosContext.Provider>
  );
}
