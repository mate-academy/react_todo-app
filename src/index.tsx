import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
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
