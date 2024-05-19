import React from 'react';

import { TodoApp } from './components/TodoApp';
import { TodosProvider } from './providers/TodosProvider';

export const App: React.FC = () => (
  <TodosProvider>
    <TodoApp />
  </TodosProvider>
);
