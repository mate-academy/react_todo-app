import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from '../../types/Todo';

export enum FilterSettings {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

type Props = {
  children: React.ReactNode;
};

type TodoContextType = {
  todosList: Todo[];
  setTodosList: (v: Todo[]) => void;
  newTodo: Todo;
  setNewTodo: (v: { title: string; id: number; completed: boolean }) => void;
  filterSettings: FilterSettings;
  setFilterSettings: (v: FilterSettings) => void;
};

export const todoPattern = {
  title: '',
  id: +new Date(),
  completed: false,
};

const initialTodosList = () => {
  const ourList = localStorage.getItem('todosList');

  if (ourList === null) {
    return [];
  }

  return JSON.parse(ourList);
};

export const TodoContext = React.createContext<TodoContextType>({
  todosList: [],
  setTodosList: () => {},
  newTodo: todoPattern,
  setNewTodo: () => {},
  filterSettings: FilterSettings.all,
  setFilterSettings: () => {},
});

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [newTodo, setNewTodo] = useState(todoPattern);

  const [todosList, setTodosList] = useState(initialTodosList());

  const [filterSettings, setFilterSettings] = useState(FilterSettings.all);

  useEffect(() => {
    if (todosList.length === 0) {
      localStorage.removeItem('todosList');
    } else {
      localStorage.setItem('todosList', JSON.stringify(todosList));
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
