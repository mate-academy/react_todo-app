import React from 'react';
import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { App } from './App';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
