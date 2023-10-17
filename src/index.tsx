import { createRoot } from 'react-dom/client';
import { AppContext } from './Contexts/Context';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { App } from './App';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <AppContext>
    <App />
  </AppContext>,
);
