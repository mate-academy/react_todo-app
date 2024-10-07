import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoFilter } from '../types/TodoFilter';

export const TodoContext = React.createContext({
  todos: [] as Todo[],
  filteredTodos: [] as Todo[],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTodos: (todos: Todo[]) => {},
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setFilterBy: (filter: TodoFilter) => {},
  filterBy: 'All' as TodoFilter,
});

const useLocalStorage = () => {
  const todoId = 'todos';

  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem(todoId);

    return savedTodos === null ? ([] as Todo[]) : JSON.parse(savedTodos);
  });

  if (!todos.length) {
    localStorage.setItem(todoId, JSON.stringify([]));
  }

  function saveTodo(newTodos: Todo[]) {
    localStorage.setItem(todoId, JSON.stringify(newTodos));
    setTodos(newTodos);
  }

  return [todos, saveTodo] as const;
};

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useLocalStorage();
  const [filterBy, setFilterBy] = useState<TodoFilter>('All');
  let filteredTodos = [...todos];

  if (filterBy !== 'All') {
    filteredTodos = filteredTodos.filter(t =>
      filterBy === 'Active' ? !t.completed : t.completed,
    );
  }

  return (
    <TodoContext.Provider
      value={{ todos, filteredTodos, setTodos, setFilterBy, filterBy }}
    >
      {children}
    </TodoContext.Provider>
  );
};
