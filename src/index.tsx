import { createRoot } from 'react-dom/client';
import React from 'react';
import { TodoProvider } from './Components/Context/TodoContext';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { App } from './App';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodoProvider>
    <App />
  </TodoProvider>);
