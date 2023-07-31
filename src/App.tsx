import React from 'react';

import { TodosApp } from './Components/TodosApp/TodosApp';
import { TodosProvider } from './Components/TodosContext/TodosContext';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <TodosApp />
    </TodosProvider>
  );
};
