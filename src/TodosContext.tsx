import React, { useState } from 'react';
import { Todo } from './types/Todo';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Status } from './types/Status';

type TodosContextType = {
  todos: Todo[];
  setTodos: (v: Todo[]) => void;
  visibleTodos: () => Todo[];
  filter: Status;
  setFilter: (v: Status) => void;
  checked: boolean;
  setChecked: (v: boolean) => void;
};

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
  visibleTodos: () => [],
  filter: Status.ALL,
  setFilter: () => { },
  checked: false,
  setChecked: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState(Status.ALL);
  const [checked, setChecked] = useState<boolean>(
    todos.every(todo => todo.completed) && todos.length > 0,
  );

  const visibleTodos = () => {
    switch (filter) {
      case Status.ALL:
        return todos;

      case Status.ACTIVE:
        return todos.filter(todo => todo.completed === false);

      case Status.COMPLETED:
        return todos.filter(todo => todo.completed === true);

      default:
        return todos;
    }
  };

  const value = {
    todos,
    setTodos,
    visibleTodos,
    filter,
    setFilter,
    checked,
    setChecked,
  };

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
