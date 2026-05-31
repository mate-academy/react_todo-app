/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoProvider } from './context/TodoContext';
import { TodoApp } from './components/TodoApp';

export const App = () => (
  <TodoProvider>
    <TodoApp />
  </TodoProvider>
);
