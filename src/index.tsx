import { createRoot } from 'react-dom/client';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { App } from './App';
import { TodoStateProvider } from './state/TodosContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodoStateProvider>
    <App />
  </TodoStateProvider>,
);
