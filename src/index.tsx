import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { App } from './App';
import React from 'react';
import { TodosDataProvider } from './contexts';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodosDataProvider>
    <App />
  </TodosDataProvider>,
);
