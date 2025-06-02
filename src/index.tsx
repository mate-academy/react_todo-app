import './styles/index.scss';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import React from 'react';
import { GlobalStateProvider } from './app/store';

createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>,
);
