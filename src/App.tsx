/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import { TodosFilter } from './components/TodosFilter';
import { TodoApp } from './components/TodoApp';
import { TodoList } from './components/TodoList';
import { TodosProvider } from './context/TodosContext';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodosProvider>
        <TodoApp />
        <TodoList />
        <TodosFilter />
      </TodosProvider>
    </div>
  );
};
