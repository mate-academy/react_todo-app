import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { App } from './App';
import { GlobalTodosContext } from './context/TodosContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalTodosContext>
    <App />
  </GlobalTodosContext>,
);
