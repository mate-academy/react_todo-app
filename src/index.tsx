import { createRoot } from 'react-dom/client';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { HashRouter } from 'react-router-dom';
import { App } from './App';

const container = document.getElementById('root');

if (container) {
  createRoot(container).render(
    <HashRouter>
      <App />
    </HashRouter>,
  );
}
