/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Todo } from './types/Todo';
import { TodosContext, SetTodosContext } from './contexts/TodosContext';
import { TodoApp } from './components/TodoApp';

function useLocalStorage<T>(key: string, initialValue: T):
[T, (newValue: T) => void] {
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

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  return (
    <SetTodosContext.Provider value={setTodos}>
      <TodosContext.Provider value={todos}>
        <TodoApp />
      </TodosContext.Provider>
    </SetTodosContext.Provider>
  );
};
