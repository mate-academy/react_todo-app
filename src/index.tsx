import { createRoot } from 'react-dom/client';

import './styles/index.scss';
import './styles/filter.scss';
import './styles/todo.scss';
import './styles/todoapp.scss';

import { App } from './App';
import { GlobalProvider } from './context/GlobalContext/GlobalContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>
);
