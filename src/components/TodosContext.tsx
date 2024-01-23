import React, { useState } from 'react';
import { TodosFilter } from '../types/TodosFilter';
import Todo from '../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Props = {
  todos: Todo[],
  todosFilter: TodosFilter,
  setTodos: (todos: Todo[]) => void,
  setTodosFilter: (filter: TodosFilter) => void,
};

export const TodosContext = React.createContext<Props>({
  todos: [],
  todosFilter: TodosFilter.all,
  setTodos: () => {},
  setTodosFilter: () => {},
});

type TodoChildren = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<TodoChildren> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [todosFilter, setTodosFilter] = useState<TodosFilter>(TodosFilter.all);

  return (
    <TodosContext.Provider
      value={{
        todos,
        todosFilter,
        setTodos,
        setTodosFilter,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
