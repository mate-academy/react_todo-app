import React from 'react';

import { ToDoProvider } from './Components/Context/ToDoContext';
import { ToDoApp } from './Components/ToDoApp';

export const App: React.FC = () => (

  <ToDoProvider>
    <ToDoApp />
  </ToDoProvider>
);
