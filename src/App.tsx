import React from 'react';
import { TodoApp } from './components/TodoApp';
import { TodosProvider } from './components/TodosContext';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodosProvider>
        <TodoApp />
      </TodosProvider>
    </div>
  );
};
