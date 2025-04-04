import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { App } from './App';
import { TodoProvider } from './context/TodoProvider';
import React from 'react';
import { FilterProvider } from './context/FilterProvider';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodoProvider>
    <FilterProvider>
      <App />
    </FilterProvider>
  </TodoProvider>,
);
