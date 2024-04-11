import React, { useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Todo } from '../../types/Todo';

type FilterSettings = string;
type Props = {
  children: React.ReactNode;
};

type TodoContextType = {
  todosList: Todo[];
  setTodosList: (v: Todo[]) => void;
  newTodo: Todo;
  setNewTodo: (v: { title: string; id: number; completed: boolean }) => void;
  filterSettings: FilterSettings;
  setFilterSettings: (v: string) => void;
};

export const todoPattern = {
  title: '',
  id: 1,
  completed: false,
};

const initialTodosList: Todo[] = [];

export const TodoContext = React.createContext<TodoContextType>({
  todosList: [],
  setTodosList: () => {},
  newTodo: todoPattern,
  setNewTodo: () => {},
  filterSettings: 'all',
  setFilterSettings: () => {},
});

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [newTodo, setNewTodo] = useState(todoPattern);
  const [todosList, setTodosList] = useLocalStorage(
    'todosList',
    initialTodosList,
  );
  const [filterSettings, setFilterSettings] = useState('all');

  useEffect(() => {
    if (todosList.length === 0) {
      localStorage.removeItem('todosList');
    }
  }, [todosList]);

  const value = useMemo<TodoContextType>(
    () => ({
      todosList,
      setTodosList,
      newTodo,
      setNewTodo,
      filterSettings,
      setFilterSettings,
    }),
    [
      todosList,
      setTodosList,
      newTodo,
      setNewTodo,
      filterSettings,
      setFilterSettings,
    ],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
