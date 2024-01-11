import React from 'react';

import { TodoProvider } from './Components/Context/TodoContext';
import { TodoApp } from './Components/TodoApp';

export const App: React.FC = () => (

  <TodoProvider>
    <TodoApp />
  </TodoProvider>
);
