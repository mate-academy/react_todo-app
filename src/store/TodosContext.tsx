import React, { useMemo, useState } from 'react';
import { Todo } from '../types/Todo';

type TodoContextType = {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
};

export const TodosContext = React.createContext<TodoContextType>({
  todos: [],
  setTodos: () => {},
});

type Props = {
  children: React.ReactNode,
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const initialState = [
    {
      id: 0,
      title: 'Learn HTML',
      completed: true,
    },
    {
      id: 1,
      title: 'Learn CSS',
      completed: true,
    },
    {
      id: 2,
      title: 'Learn JS',
      completed: false,
    },
    {
      id: 3,
      title: 'Learn React',
      completed: false,
    },
  ];
  const [todos, setTodos] = useState<Todo[]>(initialState);

  const value = useMemo(() => ({
    todos,
    setTodos,
  }), [todos]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
