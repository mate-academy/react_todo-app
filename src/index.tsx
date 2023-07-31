import { createRoot } from 'react-dom/client';
import React from 'react';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import App from './App';
import { TodosProvider } from './components/utils';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodosProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TodosProvider>,
);
