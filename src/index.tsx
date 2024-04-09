import { createRoot } from 'react-dom/client';

import './styles/index.scss';
// import './styles/todo-list.scss';
// import './styles/filters.scss';

import { App } from './App';
import React from 'react';
import { GlobelStateProvider } from './context/ReduxContex';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobelStateProvider>
    <App />
  </GlobelStateProvider>,
);
