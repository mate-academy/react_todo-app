import React from 'react';
import { TodoApp } from './components/TodoApp';
import { TodoProvider } from './components/TodoContext';

export const App: React.FC = () => (
  <TodoProvider>
    <TodoApp />
  </TodoProvider>
);
