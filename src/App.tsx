/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodosProvider } from './components/TodosContext';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodosProvider>
        <TodoApp />
      </TodosProvider>
    </div>
  );
};
