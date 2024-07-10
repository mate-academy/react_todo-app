import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { GlobalTodosState } from './providers/TodosProvider';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';
import './styles/todoapp.scss';
import './styles/todo.scss';
import './styles/filter.scss';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalTodosState>
    <App />
  </GlobalTodosState>,
);
