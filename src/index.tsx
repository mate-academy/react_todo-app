import { createRoot } from 'react-dom/client';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { App } from './App';
import { Store } from './Store';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <Store>
    <App />
  </Store>,
);
