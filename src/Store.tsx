import { createContext, useMemo, useState } from 'react';
import { Todo } from './types';

function useLocalStorage(key: string, defaultValue: Todo[]) {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem(key);

    if (savedTodos === null) {
      localStorage.setItem('todos', JSON.stringify(defaultValue));

      return JSON.parse(localStorage.getItem('todos') as string);
    } else {
      return JSON.parse(savedTodos);
    }
  });

  function saveTodos(newTodos: Todo[]) {
    setTodos(newTodos);

    localStorage.setItem(key, JSON.stringify(newTodos));
  }

  return [todos, saveTodos] as const;
}

export const TodosContext = createContext({
  todos: [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTodos: (_newTodos: Todo[]) => {},
});

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useLocalStorage('todos', []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(() => ({ todos, setTodos }), [todos]);

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
