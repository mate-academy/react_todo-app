import React, { useState } from 'react';
import { Todo } from '../types/todo';

type TodosType = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export const TodosContext = React.createContext<TodosType>({
  todos: [],
  setTodos: () => {},
});

function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (newValue: T) => void] {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(key);

    if (item === null) {
      return initialValue;
    }

    try {
      return JSON.parse(item);
    } catch (error) {
      return initialValue;
    }
  });

  const setItem = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, setItem];
}

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const value = {
    todos,
    setTodos,
  };

  return (
    <TodosContext.Provider value={value}>
      { children }
    </TodosContext.Provider>
  );
};
