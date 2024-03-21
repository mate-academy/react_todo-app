import React from 'react';
import { TodosContextProvider } from './TodosContext';
import TodoApp from './components/TodoApp';

export const App: React.FC = () => {
  return (
    <TodosContextProvider>
      <TodoApp />
    </TodosContextProvider>
  );
};
