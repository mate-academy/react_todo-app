import React, { useCallback, useState } from 'react';
import { Status, Todo, TodosContextType } from '../../styles/types';

import { useLocalStorage } from '../helpers/useLocalStorage';

type Props = {
  children: React.ReactNode;
};

const initialTodo: Todo[] = [];

export const TodosContext = React.createContext<TodosContextType>({
  query: '',
  setQuery: () => { },
  allTodos: [],
  setAllTodos: () => { },
  status: Status.All,
  setStatus: () => { },
  handleToggle: () => { },
  handleDestroy: () => { },
  handleClearCompleted: () => { },
  toggleAll: () => { },
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [allTodos, setAllTodos] = useLocalStorage<Todo[]>('todos', initialTodo);
  const [status, setStatus] = useState(Status.All);
  const [query, setQuery] = useState('');

  const allChecked = allTodos.every(todo => todo.completed);

  const handleToggle = useCallback((id: number) => {
    setAllTodos(allTodos.map(todo => (
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )));
  }, [allTodos, setAllTodos]);

  const handleDestroy = useCallback((id: number) => {
    setAllTodos(allTodos.filter(todo => todo.id !== id));
  }, [allTodos, setAllTodos]);

  const handleClearCompleted = useCallback(() => {
    setAllTodos(allTodos.filter(todo => !todo.completed));
  }, [allTodos, setAllTodos]);

  const toggleAll = useCallback(() => {
    setAllTodos(allTodos.map(todo => (
      { ...todo, completed: !allChecked }
    )));
  }, [allTodos, allChecked, setAllTodos]);

  return (
    <TodosContext.Provider
      value={{
        query,
        setQuery,
        allTodos,
        status,
        setAllTodos,
        setStatus,
        handleToggle,
        handleDestroy,
        handleClearCompleted,
        toggleAll,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
