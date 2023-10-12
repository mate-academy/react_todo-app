import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { TodoApp } from './TodoApp';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <HashRouter>
    <TodoApp />
  </HashRouter>,
);
