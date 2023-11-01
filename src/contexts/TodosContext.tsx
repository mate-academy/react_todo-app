import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';
import { useLocalStorage } from '../hooks/UseLocalStorage';

type Props = {
  todos: Todo[];
  setTodos: (todosToSet: Todo[]) => void;
  selectedFilter: Status;
  setSelectedFilter: (action: Status) => void;
  isShownTodos: Todo[]
};

export const TodosContext = React.createContext<Props>({
  todos: [],
  setTodos: () => { },
  selectedFilter: Status.All,
  setSelectedFilter: () => { },
  isShownTodos: [],
});

type PropsWithChildren = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [selectedFilter, setSelectedFilter] = useState<Status>(Status.All);

  const isShownTodos = todos.filter(todo => {
    if (selectedFilter === Status.All) {
      return true;
    }

    if (selectedFilter === Status.Active) {
      return !todo.completed;
    }

    return todo.completed;
  });

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        selectedFilter,
        setSelectedFilter,
        isShownTodos,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
