import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { App } from './App';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
