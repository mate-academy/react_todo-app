import { createRoot } from 'react-dom/client';

import './styles/index.scss';
// import './styles/todo-list.scss';
// import './styles/filters.scss';

import { App } from './App';
import { GlobalStateProvider } from './store/store';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>,
);
