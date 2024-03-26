/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { TodoApp } from './components/TodoApp';
import { TodosContext } from './components/TodosContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Filter } from './types/filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filterType, setFilterType] = useState(Filter.ALL);

  return (
    <div className="todoapp">
      <TodosContext.Provider
        value={{ todos, setTodos, filterType, setFilterType }}
      >
        <TodoApp />
      </TodosContext.Provider>
    </div>
  );
};
