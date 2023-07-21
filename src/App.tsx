/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Todo } from './types/Todo';
import { TodosContext } from './contexts/TodosContext';
import { TodoApp } from './components/TodoApp';
import { useLocalStorage } from './hooks/useLocalStorage';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  return (
    <TodosContext.Provider value={[todos, setTodos]}>
      <TodoApp />
    </TodosContext.Provider>
  );
};
