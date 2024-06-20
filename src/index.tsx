import { createRoot } from 'react-dom/client';

import './styles/index.scss';
import './styles/filter.scss';
import './styles/todoapp.scss';
import './styles/todo.scss';

import { App } from './App';
import { GlobalStateProvider } from './components/StoreTodos/StoreTodos';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>,
);
