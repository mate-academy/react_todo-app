import React from 'react';
import { TodoApp } from './components/TodaApp';
import { TodoProvider } from './components/TodoContext';

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
};
