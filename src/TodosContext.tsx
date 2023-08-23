import React, { useMemo, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Status } from './types/Status';
import { Todo } from './types/Todo';

type TodosGlobalContext = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  filter: string
  setFilter: (filter: string) => void;
  filteredTodos: Todo[];
};

export const TodosContext = React.createContext<TodosGlobalContext>({
  todos: [],
  setTodos: () => {},
  filter: '',
  setFilter: () => {},
  filteredTodos: [],
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState('');

  const filteredTodos = useMemo(() => {
    return todos.filter((todo: Todo) => {
      switch (filter) {
        case Status.Active:
          return !todo.completed;

        case Status.Completed:
          return todo.completed;

        default:
          return true;
      }
    });
  }, [todos, filter]);

  const value = useMemo(() => ({
    todos,
    setTodos,
    filter,
    setFilter,
    filteredTodos,
  }), [todos, filter]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
