import React from 'react';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

type TodoContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
};

export const todoContext = React.createContext<TodoContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = React.useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');

    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = React.useState<Filter>('all');

  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <todoContext.Provider value={{ todos, setTodos, filter, setFilter }}>
      {children}
    </todoContext.Provider>
  );
};
