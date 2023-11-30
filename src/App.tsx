import React from 'react';
import { TodosContextProvider } from './components/TodosContext';
import { TodoApp } from './components/TodoApp/TodoApp';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodosContextProvider>
        <TodoApp />
      </TodosContextProvider>
    </div>
  );
};
