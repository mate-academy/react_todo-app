import { createRoot } from 'react-dom/client';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { HashRouter } from 'react-router-dom';
import { App } from './App';

const container = document.getElementById('app');

if (container) {
  const root = createRoot(container);

  root.render(
    <HashRouter>
      <App />
    </HashRouter>,
  );
}
