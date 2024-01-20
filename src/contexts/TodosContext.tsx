import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

type TodosContextType = {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  filterValue: Status,
  setFilterValue: React.Dispatch<React.SetStateAction<Status>>;
  // todo: Todo,
};

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
  filterValue: Status.All,
  setFilterValue: () => {},
  // todo: Todo,
});

type Props = {
  children: React.ReactNode,
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [filterValue, setFilterValue] = useState<Status>(Status.All);

  const value = {
    todos,
    setTodos,
    filterValue,
    setFilterValue,
    // todo,
  };

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};

// { id: 1, title: 'fight with cat', completed: true },
// { id: 2, title: 'buy meat', completed: false },
// { id: 3, title: 'drink coffee', completed: true },
// { id: 4, title: 'clean room', completed: false },
// { id: 5, title: 'clean room', completed: false },
