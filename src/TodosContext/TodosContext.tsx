import React, { useState } from 'react';
import { Todo } from '../Types/Todo';
import { useLocalStorage } from '../hooks/UseLocalStorege';
import { Status } from '../Types/Status';

type TodosContextProps = {
  todos: Todo[];
  setTodos: (v: Todo[]) => void;
  checkbox: boolean;
  setCheckbox: (v: boolean) => void;
  filter: Status;
  setFilter: (v: Status) => void;
  visibleTodos: () => void;
};

export const TodosContext = React.createContext<TodosContextProps>({
  todos: [],
  setTodos: () => { },
  checkbox: false,
  setCheckbox: () => { },
  filter: Status.ALL,
  setFilter: () => { },
  visibleTodos: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [checkbox, setCheckbox] = useState(false);
  const [filter, setFilter] = useState(Status.ALL);

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
    checkbox,
    setCheckbox,
    filter,
    setFilter,
    visibleTodos,
  };

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
