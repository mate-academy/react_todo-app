import { createRoot } from 'react-dom/client';

import './styles/index.scss';
import './styles/todo.scss';
import './styles/filter.scss';
import './styles/todoapp.scss';
import { TodosProvider } from './Store';

import { App } from './App';
import React from 'react';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodosProvider>
    <App />
  </TodosProvider>,
);
