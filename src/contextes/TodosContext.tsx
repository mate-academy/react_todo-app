import React, { createContext, useMemo, useState } from 'react';
import { TodoContext } from '../types/TodoContext';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const TodosContext = createContext<TodoContext>({
  todos: [],
  setTodos: () => { },
  title: '',
  setTitle: () => { },
  filterField: 'All',
  setFilterField: () => { },
});

type Props = {
  children: React.ReactNode
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [title, setTitle] = useState('');

  const [filterField, setFilterField] = useState('All');

  const preparedValue = useMemo(() => ({
    todos,
    setTodos,
    title,
    setTitle,
    filterField,
    setFilterField,
  }), [todos, title, filterField, setTodos]);

  return (
    <TodosContext.Provider value={preparedValue}>
      {children}
    </TodosContext.Provider>
  );
};
