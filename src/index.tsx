import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { HashRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const container = document.getElementById('root');

if (container !== null) {
  const root = createRoot(container);

  root.render(
    <HashRouter>
      <App />
    </HashRouter>,
  );
}
