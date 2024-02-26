import { createRoot } from 'react-dom/client';
import React from 'react';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { App } from './App';
import { TodosContext } from './components/TodosContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <React.StrictMode>
    <TodosContext>
      <App />
    </TodosContext>
  </React.StrictMode>,
);
