import { createRoot } from 'react-dom/client';
import React from 'react';
import './styles/index.scss';
import { App } from './App';
import { TodosProvider } from './contexts/TodosContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <React.StrictMode>
    <TodosProvider>
      <App />
    </TodosProvider>
  </React.StrictMode>,
);
