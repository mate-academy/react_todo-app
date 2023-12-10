import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  children: React.ReactNode
};

export const TodoContext = React.createContext<{
  todos: Todo[],
  setTodos(todos: Todo[]):void
}>({
      todos: [],
      setTodos: () => {},
    });

function useLocalStorage(
  key: string,
  startValue:Todo[],
): [Todo[], (v: Todo[]) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      return startValue;
    }
  });

  const save = (newValue: Todo[]) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}

export const TodoProvider:React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage('todos', []);

  const value = {
    todos,
    setTodos,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
