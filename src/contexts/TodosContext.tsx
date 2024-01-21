import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

type TodosContextType = {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  filterValue: Status,
  setFilterValue: React.Dispatch<React.SetStateAction<Status>>;
};

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
  filterValue: Status.All,
  setFilterValue: () => {},
});

type Props = {
  children: React.ReactNode,
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([
    // { id: 1, title: 'fight with cat', completed: false },
    // { id: 2, title: 'buy meat', completed: false },
    // { id: 3, title: 'drink coffee', completed: true },
    // { id: 4, title: 'clean room', completed: false },
    // { id: 5, title: 'clean clothes', completed: true },
  ]);

  const [filterValue, setFilterValue] = useState<Status>(Status.All);

  const value = {
    todos,
    setTodos,
    filterValue,
    setFilterValue,
  };

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
