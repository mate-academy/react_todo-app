import { FilterBy } from '../types/FilterBy';
import { Todo } from '../types/Todo';
import React, { useMemo, useState, createContext, useEffect } from 'react';
import { TodosContextType } from '../types/TodosContextType';

type Props = {
  children: React.ReactNode;
};

export const TodosContext = createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
  filterBy: FilterBy.All,
  setFilterBy: () => {},
  activeTodosAmount: 0,
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);

  const activeTodosAmount = useMemo(() => {
    return todos.filter(t => !t.completed).length;
  }, [todos]);

  useEffect(() => {
    const saved = localStorage.getItem('todos');

    setTodos(saved ? (JSON.parse(saved) as Todo[]) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
      filterBy,
      setFilterBy,
      activeTodosAmount,
    }),
    [todos, filterBy, activeTodosAmount],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
