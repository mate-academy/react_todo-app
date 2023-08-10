import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';
import { useLocalStorage } from '../hooks/useLocalStorage';

type TodosContextType = {
  todos: Todo[];
  setTodos: (todo: Todo[]) => void;
  checked: boolean;
  setChecked: (isChecked: boolean) => void;
  visibleTodos: () => Todo[];
  filter: Status;
  setFilter: (filter: Status) => void;
};

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
  checked: false,
  setChecked: () => {},
  visibleTodos: () => [],
  filter: Status.ALL,
  setFilter: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [checked, setChecked] = useState<boolean>(
    todos.every(todo => todo.completed) && todos.length > 0,
  );
  const [filter, setFilter] = useState(Status.ALL);

  const visibleTodos = () => {
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
  };

  const value = {
    todos,
    setTodos,
    checked,
    setChecked,
    visibleTodos,
    filter,
    setFilter,
  };

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
