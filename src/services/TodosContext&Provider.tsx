import { Todo } from '../types/todo';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TodoFilter } from '../types/todo filter';

type TodosContextType = {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  selectedFilter: TodoFilter;
  setSelectedFilter: (filter: TodoFilter) => void;
};

const storedTodos = localStorage.getItem('todos');

export const TodosContext = React.createContext<TodosContextType>({
  todos: JSON.parse(storedTodos),
  setTodos: () => {},
  selectedFilter: TodoFilter.All,
  setSelectedFilter: () => {},
});

export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<TodoFilter>(
    TodoFilter.All,
  );

  useEffect(() => {
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosContext.Provider
      value={{ todos, setTodos, selectedFilter, setSelectedFilter }}
    >
      {children}
    </TodosContext.Provider>
  );
};
