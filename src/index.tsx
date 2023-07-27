import { HashRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { App } from './App';

const Root = () => (
  <HashRouter>
    <App />
  </HashRouter>
);

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(<Root />);
