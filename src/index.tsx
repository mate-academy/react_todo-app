import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { App } from './App';
import React from 'react';
import { TodoProvider } from './context/TodoContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodoProvider>
    <App />
  </TodoProvider>,
);
