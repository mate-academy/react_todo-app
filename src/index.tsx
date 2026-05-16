import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/index.scss';

import { App } from './App';
import { TodoProvider } from './context/TodoContext';

const container = document.getElementById('root') as HTMLDivElement;

ReactDOM.createRoot(container).render(
  <TodoProvider>
    <App />
  </TodoProvider>,
);
