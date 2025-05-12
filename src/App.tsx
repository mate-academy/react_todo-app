/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { TodoProvider } from './context/TodoContext';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => (
  <TodoProvider>
    <TodoApp />
  </TodoProvider>
);
