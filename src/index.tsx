import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { TodoProvider } from './components/TodoContext';
import './styles/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <TodoProvider>
      <App />
    </TodoProvider>
  </React.StrictMode>,
);
