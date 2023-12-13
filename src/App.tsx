import React from 'react';
import { TodosProvider } from './components/TodosContext/TodosContext';
import { TodoApp } from './components/TodoApp/TodoApp';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodosProvider>
        <TodoApp />
      </TodosProvider>
    </div>
  );
};
