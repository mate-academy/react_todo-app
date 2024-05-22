import { createRoot } from 'react-dom/client';

import './styles/index.scss';
import './styles/todoapp.scss';
import './styles/filter.scss';

import { App } from './App';
import { TodosProvider } from './context/Store';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodosProvider>
    <App />
  </TodosProvider>,
);
