import React, {
  createContext, useCallback, useMemo, useState,
} from 'react';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type Props = {
  children: React.ReactNode,
};

interface IntTodosContext {
  todos: Todo[],
  setTodos: (newTodos: Todo[]) => void,
  visibleTodos: () => Todo[],
  filter: Status,
  setFilter: (f: Status) => void,
}

const defaultValue = {
  todos: [],
  setTodos: () => { },
  visibleTodos: () => [],
  filter: Status.ALL,
  setFilter: () => { },
};

export const TodosContext = createContext<IntTodosContext>(defaultValue);

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', [] as Todo[]);
  const [filter, setFilter] = useState(Status.ALL);

  const visibleTodos = useCallback(() => {
    switch (filter) {
      case Status.ACTIVE:
        return todos.filter(currentTodo => !currentTodo.completed);

      case Status.COMPLETED:
        return todos.filter(currentTodo => currentTodo.completed);

      case Status.ALL:
      default:
        return todos;
    }
  }, [todos, filter]);

  const value = useMemo(() => ({
    todos,
    setTodos,
    visibleTodos,
    filter,
    setFilter,
  }), [todos, filter]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
