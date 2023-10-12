/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import './App.scss';
import { TodoApp } from './components/TodoApp';
import { TodosProvider } from './store/TodosContext';

export const App: React.FC = () => (
  <TodosProvider>
    <TodoApp />
  </TodosProvider>
);
