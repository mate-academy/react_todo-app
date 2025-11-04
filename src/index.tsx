import React from 'react';
import ReactDOM from 'react-dom/client';
import { TodosProvider } from './context/TodosContext';
import TodoApp from './components/TodoApp';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <TodosProvider>
        <TodoApp />
      </TodosProvider>
    </React.StrictMode>,
  );
}
