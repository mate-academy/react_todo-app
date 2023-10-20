import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { Context } from '../types/Context';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Status } from '../types/Status';

const initialState: Context = {
  todos: [],
  setTodos: () => {},
  visibleTodos: () => [],
  filter: Status.ALL,
  setFilter: () => { },
  checked: false,
  setChecked: () => {},
};

export const TodoContext = React.createContext<Context>(initialState);

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
      case Status.ACTIVE:
        return todos.filter(todo => !todo.completed);

      case Status.COMPLETED:
        return todos.filter(todo => todo.completed);

      case Status.ALL:
      default:
        return todos;
    }
  };

  const status = {
    todos,
    setTodos,
    filter,
    setFilter,
    visibleTodos,
    checked,
    setChecked,
  };

  return (
    <TodoContext.Provider value={status}>
      {children}
    </TodoContext.Provider>
  );
};
