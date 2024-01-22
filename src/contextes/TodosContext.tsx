import React, { createContext, useState } from 'react';
import { TodoContext } from '../types/TodoContext';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const TodosContext = createContext<TodoContext>({
  todos: [],
  setTodos: () => {},
  newTodo: {
    id: +new Date(),
    title: '',
    completed: false,
  },
  setNewTodo: () => {},
  filterField: 'All',
  setFilterField: () => {},
});

type Props = {
  children: React.ReactNode
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [newTodo, setNewTodo] = useState<Todo>({
    id: +new Date(),
    title: '',
    completed: false,
  });

  const [filterField, setFilterField] = useState('All');

  return (
    <TodosContext.Provider value={{
      todos,
      setTodos,
      newTodo,
      setNewTodo,
      filterField,
      setFilterField,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};
