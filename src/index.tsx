import './styles/filter.scss';
import './styles/index.scss';
import './styles/todo.scss';
import './styles/todoapp.scss';

import { App } from './App';
import GlobalStateProvider from './store/store';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>,
);
