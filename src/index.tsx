import { createRoot } from 'react-dom/client';
import { App } from './App';
import { TodoProvider } from './Components/TodoContext';
import React from 'react';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <TodoProvider>
      <App />
    </TodoProvider>
  </React.StrictMode>,
);
