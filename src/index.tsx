import { createRoot } from 'react-dom/client';
import { TodosProvider } from './context/TodosContext';

import './styles/index.scss';

import { App } from './App';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodosProvider>
    <App />
  </TodosProvider>,
);
