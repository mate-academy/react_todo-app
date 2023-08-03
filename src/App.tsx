import React from 'react';

import { TodosProvider } from './TodosContext/TodosContext';
import { TodosApp } from './Components/TodosApp';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <TodosApp />
    </TodosProvider>
  );
};
