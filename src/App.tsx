import React from 'react';

import { useLocalStorage } from './utils/useLocalStorage';
import { TodosContext } from './components/context/TodosContext';
import { Todo } from './types/Todo';
import { TodoApp } from './components/TodoApp/TodoApp';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      <TodoApp />
    </TodosContext.Provider>
  );
};
