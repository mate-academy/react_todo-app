import React from 'react';

import { TodosApp } from './Components/TodosApp';
import { TodosProvider } from './TodosContext/TodosContext';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <TodosApp />
    </TodosProvider>
  );
};
