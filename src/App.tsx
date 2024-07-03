import React from 'react';
import { TodoApp } from './components/Todo';
import { TodoProvider } from './components/Todo/Context';

export const App: React.FC = () => (
  <TodoProvider>
    <TodoApp />
  </TodoProvider>
);
