import React, { useState } from 'react';
import { Option } from './types/Option';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Todo } from './types/Todo';
import { Context } from './types/Context';

const initialValue: Context = {
  todos: [],
  setTodos: () => { },
  filter: Option.All,
  setFilter: () => { },
  visibleTodos: [],
  isToggleCheckedAll: false,
  setIsToggleCheckedAll: () => {},
};

export const TodosContext = React.createContext(initialValue);

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState(Option.All);
  const [isToggleCheckedAll, setIsToggleCheckedAll]
    = useState(todos.every(todo => todo.completed));

  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case Option.Active:
        return !todo.completed;

      case Option.Completed:
        return todo.completed;

      case Option.All:
      default:
        return true;
    }
  });

  const context: Context = {
    todos,
    setTodos,
    filter,
    setFilter,
    visibleTodos,
    isToggleCheckedAll,
    setIsToggleCheckedAll,
  };

  return (
    <TodosContext.Provider value={context}>
      {children}
    </TodosContext.Provider>
  );
};
