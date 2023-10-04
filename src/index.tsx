import { createRoot } from 'react-dom/client';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { App } from './App';
import { TodosContext } from './services/TodosContext';

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(
  <TodosContext>
    <App />
  </TodosContext>,
);
