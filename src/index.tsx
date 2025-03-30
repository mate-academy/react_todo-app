import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import { App } from './App';
import { TodosProvider } from './context/TodosContext';
import React from 'react';
import { FilteredTodosProvider } from './context/FilteredTodosContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodosProvider>
    <FilteredTodosProvider>
      <App />
    </FilteredTodosProvider>
  </TodosProvider>,
);
