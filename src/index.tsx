import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';
import './styles/notification.css';

import { App } from './App';
import { GlobalStateProvider } from './context/Context';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <HashRouter>
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  </HashRouter>,
);
